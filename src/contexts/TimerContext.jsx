import { createContext, useContext, useEffect, useRef, useState } from "react";

const TimerContextProvider = createContext()

export default function TimerContext({ children }) {
    const [pomodoroMinutes, setPomodoroMinutes] = useState(10)
    const [longBreakMinutes, setLongBreakMinutes] = useState(30)
    const [shortBreakMinutes, setShortBreakMinutes] = useState(5)

    const [minutes, setMinutes] = useState(pomodoroMinutes)
    const [seconds, setSeconds] = useState(0)
    const [isPaused, setIsPaused] = useState(true)
    const [breakInfo, setBreakInfo] = useState({
        isBreak: false,
        totalBreaks: 0,
        timerType: "pomodoro",
    })

    const timeoutId = useRef()

    useEffect(() => {
        decreaseMinutes()
    }, [seconds])

    useEffect(() => {
        if(breakInfo.isBreak == false) {
            return
        }
        // set short or long break depending on total breaks
        goToBreak()
    }, [breakInfo.isBreak])

    const decreaseMinutes = () => {
        if(seconds < 0) {
            setSeconds(59)
            setMinutes(prev => prev - 1)
        }
        // when timer reaches the end
        if(!(minutes <= 0 && seconds <= 0)) {
            return
        }
        // if break is false, set break to true
        if (breakInfo.isBreak == false) {
            setBreakInfo({...breakInfo,
                isBreak: true,
                timerType: breakInfo.totalBreaks == 3 ? "long_break" : "short_break",
                totalBreaks: breakInfo.totalBreaks + 1
            })
            return
        }
        // if break is true, set break to false
        if (breakInfo.isBreak == true) {
            setBreakInfo({...breakInfo, 
                isBreak: false,
                timerType: "pomodoro"
            })
            setMinutes(pomodoroMinutes)
        }
    }

    const startTimer = () => {
        setIsPaused(false)
        timeoutId.current = setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1)
    }

    const pauseTimer = () => {
        setIsPaused(true)
        clearInterval(timeoutId.current)
    }

    const goToBreak = () => {
        if(breakInfo.totalBreaks < 4) {
            setMinutes(shortBreakMinutes)
        } else {
            setMinutes(longBreakMinutes)
        }
    }

    const value = {
        breakInfo,
        minutes,
        seconds,
        isPaused,
        startTimer,
        pauseTimer,
    }

    return (
        <TimerContextProvider.Provider value={value}>
            { children }
        </TimerContextProvider.Provider>
    )
}

export const useTimerContext = () => useContext(TimerContextProvider);