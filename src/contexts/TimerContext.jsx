import { createContext, useContext, useEffect, useRef, useState } from "react";
import arcadeAlarm from "../assets/alarms/arcade.wav"
import cartoonAlarm from "../assets/alarms/cartoon.wav"
import guitarAlarm from "../assets/alarms/guitar.wav"
import { Timestamp, addDoc, collection, doc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase-config"
const TimerContextProvider = createContext()

export default function TimerContext({ children }) {
    // set timer minutes to localStorage minutes, if undefined set to default value ("25", "15", "5")
    const [pomodoroMinutes, setPomodoroMinutes] = useState(JSON.parse(localStorage.getItem("alarm_settings"))?.pomodoroMinutes ? JSON.parse(localStorage.getItem("alarm_settings"))?.pomodoroMinutes : 25)
    const [longBreakMinutes, setLongBreakMinutes] = useState(JSON.parse(localStorage.getItem("alarm_settings"))?.longBreakMinutes ? JSON.parse(localStorage.getItem("alarm_settings"))?.longBreakMinutes : 15)
    const [shortBreakMinutes, setShortBreakMinutes] = useState(JSON.parse(localStorage.getItem("alarm_settings"))?.shortBreakMinutes ? JSON.parse(localStorage.getItem("alarm_settings"))?.shortBreakMinutes : 5)
    
    const [breaksUntilLongBreak, setBreaksUntilLongBreak] = useState(3)

    const [minutes, setMinutes] = useState(pomodoroMinutes)
    const [seconds, setSeconds] = useState(0)
    const [isPaused, setIsPaused] = useState(true)
    const [breakInfo, setBreakInfo] = useState({
        isBreak: false,
        totalBreaks: 0,
        timerType: "pomodoro",
    })

    const timeoutId = useRef()
    
    const databaseMinutesInterval = useRef()

    useEffect(() => {
        decreaseMinutes()
    }, [seconds])

    useEffect(() => {
        if (isPaused) {
            clearInterval(databaseMinutesInterval.current)
            return
        }

        // TODO: change firebase minutes structure
        
        databaseMinutesInterval.current = setInterval(() => {
            !isPaused ? incrementPomodoroMinutes() : null
        }, 2000)
    }, [isPaused])
    
    const incrementPomodoroMinutes = () => {
        const d = new Date()
        const docId = `${(d.getMonth() + 1).toString().length < 2 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1}-${d.getFullYear()}`

        // updateDoc(doc(db, `users/${auth.currentUser.uid}/pomodoro`, docId), {
        //     minutes: increment(1)
        // })

        setDoc(doc(db, `users/${auth.currentUser.uid}/pomodoro`, docId), {
            minutes: increment(1)
        }, { merge: true })
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
                playAlarm()

                setBreakInfo({...breakInfo,
                    isBreak: true,
                    timerType: breakInfo.totalBreaks >= breaksUntilLongBreak ? "long_break" : "short_break",
                    totalBreaks: breakInfo.totalBreaks + 1
                })

                // after 3 breaks execute a long break
                if (breakInfo.totalBreaks >= breaksUntilLongBreak) {
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

        playAlarm()
    }
    
    const startTimer = () => {
        setIsPaused(false)
        timeoutId.current = setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1000)
    }

    const pauseTimer = () => {
        setIsPaused(true)
        clearInterval(timeoutId.current)
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

    // context value
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

// timer context hook
export const useTimerContext = () => useContext(TimerContextProvider);