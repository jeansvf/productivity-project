import { createContext, useContext, useEffect, useRef, useState } from "react";
import arcadeAlarm from "../assets/alarms/arcade.wav"
import cartoonAlarm from "../assets/alarms/cartoon.wav"

const TimerContextProvider = createContext()

export default function TimerContext({ children }) {
    const [pomodoroMinutes, setPomodoroMinutes] = useState(25)
    const [longBreakMinutes, setLongBreakMinutes] = useState(15)
    const [shortBreakMinutes, setShortBreakMinutes] = useState(5)
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

    const playAlarm = () => {
        new Audio(cartoonAlarm).play()
    }

    // every second decrease minutes and check if timer ended
    useEffect(() => {
        decreaseMinutes()
    }, [seconds])

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

        // if pomodoro is being called with arguments
        if(pause) {
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
        skipTimer
    }

    return (
        <TimerContextProvider.Provider value={value}>
            { children }
        </TimerContextProvider.Provider>
    )
}

// timer context hook
export const useTimerContext = () => useContext(TimerContextProvider);