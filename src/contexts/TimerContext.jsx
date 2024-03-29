import { createContext, useContext, useEffect, useState } from "react";
import arcadeAlarm from "../assets/alarms/arcade.wav"
import cartoonAlarm from "../assets/alarms/cartoon.wav"
import guitarAlarm from "../assets/alarms/guitar.wav"
import { doc, getDoc, increment, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase-config"
import { useAuthState } from "react-firebase-hooks/auth"
import { useProfileContext } from "./ProfileContext";

const TimerContextProvider = createContext()

const alarmWorkerURL = new URL("../workers/alarm-worker.js", import.meta.url);
const timerWorkerURL = new URL("../workers/worker.js", import.meta.url);
const dbWorkerURL = new URL("../workers/db-worker.js", import.meta.url);

const alarmTimerWorker = new Worker(alarmWorkerURL);
const timerWorker = new Worker(timerWorkerURL);
const dbTimerWorker = new Worker(dbWorkerURL);

export default function TimerContext({ children }) {
    // set timer minutes to localStorage minutes, if undefined set to default value ("25", "15", "5")
    const [pomodoroMinutes, setPomodoroMinutes] = useState(JSON.parse(localStorage.getItem("alarm_settings"))?.pomodoroMinutes ? JSON.parse(localStorage.getItem("alarm_settings"))?.pomodoroMinutes : 25)
    const [longBreakMinutes, setLongBreakMinutes] = useState(JSON.parse(localStorage.getItem("alarm_settings"))?.longBreakMinutes ? JSON.parse(localStorage.getItem("alarm_settings"))?.longBreakMinutes : 15)
    const [shortBreakMinutes, setShortBreakMinutes] = useState(JSON.parse(localStorage.getItem("alarm_settings"))?.shortBreakMinutes ? JSON.parse(localStorage.getItem("alarm_settings"))?.shortBreakMinutes : 5)
    const [todayPomodoroMinutes, setTodayPomodoroMinutes] = useState(JSON.parse(localStorage.getItem("daily_pomodoro"))?.minutes ? JSON.parse(localStorage.getItem("daily_pomodoro"))?.minutes : 0)
    const [longBreakInterval, setLongBreakInterval] = useState(JSON.parse(localStorage.getItem("alarm_settings"))?.longBreakInterval ? JSON.parse(localStorage.getItem("alarm_settings"))?.longBreakInterval : 4)
    const [autoStartBreaks, setAutoStartBreaks] = useState(JSON.parse(localStorage.getItem("alarm_settings"))?.autoStartBreaks ? JSON.parse(localStorage.getItem("alarm_settings"))?.autoStartBreaks : "false")
    const [autoStartPomodoros, setAutoStartPomodoros] = useState(JSON.parse(localStorage.getItem("alarm_settings"))?.autoStartPomodoros ? JSON.parse(localStorage.getItem("alarm_settings"))?.autoStartPomodoros : "false")
    
    const [minutes, setMinutes] = useState(pomodoroMinutes)
    const [seconds, setSeconds] = useState(0)
    const [isPaused, setIsPaused] = useState(true)
    const [breakInfo, setBreakInfo] = useState({
        isBreak: false,
        totalBreaks: 0,
        timerType: "pomodoro",
    })
    const [user] = useAuthState(auth)

    const { setCurrentMonthPomodoroMinutes } = useProfileContext()
    
    useEffect(() => {
        const unloadCallback = (e) => {
            if (isPaused) {
                window.removeEventListener("beforeunload", unloadCallback)
                return
            }
            e.preventDefault()
            e.returnValue = ""
            return ""
        }

        window.addEventListener("beforeunload", unloadCallback)

        return () => window.removeEventListener("beforeunload", unloadCallback)
    })

    useEffect(() => {
        decreaseMinutes()
        !isPaused ? document.title = `${minutes < 10 && minutes.toString().length == 1 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds} - Pomodoro` : null
    }, [seconds])

    useEffect(() => {
        isPaused ? document.title = "Focusplace" : null
    }, [isPaused])

    useEffect(() => {
        if (isPaused) {
            dbTimerWorker.postMessage("pause")
            return
        }
        
        dbTimerWorker.postMessage("start")
        dbTimerWorker.onmessage = (e) => {
            setSeconds(prev => prev - 1)
            incrementPomodoroMinutes()
            setCurrentMonthPomodoroMinutes(prev => prev + 1)
            incrementLocalStorageMinutes()
        }
    }, [isPaused])
    
    const incrementPomodoroMinutes = async () => {
        const d = new Date()
        const docId = `${(d.getMonth() + 1).toString().length < 2 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1}-${d.getFullYear()}`

        let currentDoc = await getDoc(doc(db, `users/${user.uid}/pomodoro/${docId}`))

        if (currentDoc.data()) {
            setDoc(doc(db, `users/${user.uid}/pomodoro`, docId), {
                minutes: increment(1)
            }, { merge: true })
        } else {
            setDoc(doc(db, `users/${user.uid}/pomodoro`, docId), {
                minutes: increment(1),
                date: docId
            }, { merge: true })
        }
    }

    const incrementLocalStorageMinutes = () => {
        let newDailyPomodoro = JSON.parse(localStorage.getItem("daily_pomodoro"))

        let date = new Date()
        let currentDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

        if (!newDailyPomodoro || newDailyPomodoro.date != currentDate) {
            localStorage.setItem("daily_pomodoro", JSON.stringify({ date: currentDate, minutes: 0 }))

            incrementLocalStorageMinutes()
            return
        }

        newDailyPomodoro.minutes += 1

        setTodayPomodoroMinutes(newDailyPomodoro.minutes)
        localStorage.setItem("daily_pomodoro", JSON.stringify(newDailyPomodoro))
    }

    const playAlarm = () => {
        let alarmSettings = JSON.parse(localStorage.getItem("alarm_settings"))

        switch (alarmSettings?.alarmSound) {
            case "arcade":
                let arcade = new Audio(arcadeAlarm)
                arcade.volume = alarmSettings?.volume ? alarmSettings.volume : .5
                arcade.play()
                return;

            case "cartoon":
                let cartoon = new Audio(cartoonAlarm)
                cartoon.volume = alarmSettings?.volume ? alarmSettings.volume : .5
                cartoon.play()
                return;

            case "guitar":
                let guitar = new Audio(guitarAlarm)
                guitar.volume = alarmSettings?.volume ? alarmSettings.volume : .5
                guitar.play()
                return;

            default:
                let defaultAlarm = new Audio(arcadeAlarm)
                defaultAlarm.volume = alarmSettings?.volume ? alarmSettings.volume : .5
                defaultAlarm.play()
                return;
        }
    }

    const decreaseMinutes = () => {
        // add seconds and decrease minutes when seconds countdown ends
        if(seconds < 0) {
            setSeconds(59)
            setMinutes(prev => prev - 1)
        }

        // return if timer didn't end
        if(!(minutes <= 0 && seconds <= 0)) {
            return
        }

        // go to break if last timer wasnt a break
        if (!breakInfo.isBreak) {
            goToBreak()
            return
        }

        // go to pomodoro if last timer was a break
        if (breakInfo.isBreak) {
            goToPomodoro()
        }
    }

    const goToBreak = (breakType) => {
        setSeconds(0)

        // if goToBreak() is being called with argument
        switch (breakType) {
            case "short_break":
                pauseTimer()
                setMinutes(shortBreakMinutes)
                setBreakInfo({...breakInfo,
                    isBreak: true,
                    timerType: "short_break",
                })
            return;

            case "long_break":
                pauseTimer()
                setMinutes(longBreakMinutes)
                setBreakInfo({...breakInfo,
                    isBreak: true,
                    timerType: "long_break",
                    totalBreaks: 0,
                })
            return;
        
            // if goToBreak() is being called without argument
            default:
                if (autoStartBreaks === "false") {
                    pauseTimer()
                }

                alarmTimerWorker.postMessage("ring")
                alarmTimerWorker.onmessage = (e) => {
                    playAlarm()
                }

                setBreakInfo({...breakInfo,
                    isBreak: true,
                    timerType: breakInfo.totalBreaks >= longBreakInterval - 1 ? "long_break" : "short_break",
                    totalBreaks: breakInfo.totalBreaks + 1
                })

                // after longBreakInterval - 1 breaks execute a long break
                if (breakInfo.totalBreaks >= longBreakInterval - 1) {
                    setMinutes(longBreakMinutes)
                    setBreakInfo({...breakInfo,
                        isBreak: true,
                        timerType: "long_break",
                        totalBreaks: 0,
                    })
                } else {
                    setMinutes(shortBreakMinutes)
                }
            return;
        }
    }

    const goToPomodoro = (pause) => {
        if (autoStartPomodoros === "false") {
            setSeconds(0)
            pauseTimer()
        }

        setBreakInfo({...breakInfo,
            isBreak: false,
            timerType: "pomodoro"
        })
        setMinutes(pomodoroMinutes)

        // if pomodoro was called paused, return
        if(pause == "pause") {
            setSeconds(0)
            pauseTimer()
            return;
        }

        alarmTimerWorker.postMessage("ring")
        alarmTimerWorker.onmessage = (e) => {
            playAlarm()
        }
    }
    
    const startTimer = () => {
        setIsPaused(false)
        timerWorker.postMessage("start")
        timerWorker.onmessage = (e) => {
            setSeconds(prev => prev - 1)
        }
    }

    const pauseTimer = () => {
        timerWorker.postMessage("pause")
        setIsPaused(true)
    }

    const skipTimer = () => {
        setSeconds(0)
        pauseTimer()
        
        // go to break if last timer wasnt a break
        if (!breakInfo.isBreak) {
            goToBreak()
            return
        }

        // go to pomodoro if last timer was a break
        if (breakInfo.isBreak) {
            goToPomodoro()
        }
    }

    const customizeTimer = (timerType, newTime) => {
        if (newTime == "" || newTime == 0) {
            return
        }
        
        switch(timerType) {
            case "pomodoro":
            setPomodoroMinutes(newTime)
            goToPomodoro("pause")
            setMinutes(newTime)
            return

            case "long_break":
            setLongBreakMinutes(newTime)
            goToBreak("long_break")
            setMinutes(newTime)
            return

            case "short_break":
            setShortBreakMinutes(newTime)
            goToBreak("short_break")
            setMinutes(newTime)
            return
        }
    }

    const customizeLongBreakInterval = (interval) => {
        if(isNaN(parseInt(interval)) || interval == 0) {
            return
        }

        setLongBreakInterval(interval)

        let newAlarmSettings = JSON.parse(localStorage.getItem("alarm_settings")) ? JSON.parse(localStorage.getItem("alarm_settings")) : {}
        newAlarmSettings.longBreakInterval = interval

        localStorage.setItem("alarm_settings", JSON.stringify(newAlarmSettings))
    }

    const customizeAutoStart = (alarmType, condition) => {
        let newAlarmSettings = JSON.parse(localStorage.getItem("alarm_settings")) ? JSON.parse(localStorage.getItem("alarm_settings")) : {}
        switch (true) {
            case (alarmType === "break"):
                setAutoStartBreaks(condition)

                newAlarmSettings.autoStartBreaks = `${condition}`

                localStorage.setItem("alarm_settings", JSON.stringify(newAlarmSettings))
                break;
            case (alarmType === "pomodoro"):
                setAutoStartPomodoros(condition)

                newAlarmSettings.autoStartPomodoros = `${condition}`

                localStorage.setItem("alarm_settings", JSON.stringify(newAlarmSettings))
                break;
        }
    }

    const value = {
        breakInfo,
        minutes,
        seconds,
        isPaused,
        startTimer,
        pauseTimer,
        goToPomodoro,
        goToBreak,
        skipTimer,
        customizeTimer,
        customizeAutoStart,
        customizeLongBreakInterval,
        longBreakInterval,
        todayPomodoroMinutes,
        pomodoroMinutes,
        setPomodoroMinutes,
        longBreakMinutes,
        shortBreakMinutes,
        playAlarm,
    }

    return (
        <TimerContextProvider.Provider value={value}>
            { children }
        </TimerContextProvider.Provider>
    )
}

export const useTimerContext = () => useContext(TimerContextProvider);