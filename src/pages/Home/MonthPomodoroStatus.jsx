import { useEffect, useState } from "react"
import { useProfileContext } from "../../contexts/ProfileContext"

export default function MonthPomodoroStatus({ months }) {
    const [currentMonthPomodoroMinutes, setCurrentMonthPomodoroMinutes] = useState(0)

    const { userPomodoros, userInfo } = useProfileContext()

    useEffect(() => {
        userPomodoros.map((pomodoro => {
            pomodoro.date == getDate() ? setCurrentMonthPomodoroMinutes(pomodoro.minutes) : null
        }))
    }, [userPomodoros])

    const getDate = () => {
        let today = new Date()
        return `${today.getFullYear()}, ${today.getMonth() + 1}`
    }

    const getCurrentMonth = () => {
        let today = new Date()
        return months[today.getMonth()]
    }

    const getFormattedMinutes = () => {
        return currentMonthPomodoroMinutes < 60 ? `${currentMonthPomodoroMinutes} minutes` : `${(currentMonthPomodoroMinutes / 60).toFixed(1)} hours`
    }
    
    const getMonthCompletion = (minutes) => {
        let hours = minutes / 60
        return (hours / (userInfo.plannedHours * 30)) * 100
    }

    return (
        <div className="w-72 px-3.5 py-3 rounded-md bg-[#2E2E2E] font-bold">
            <div className="flex items-center text-xl">
                <p>{getCurrentMonth()}&nbsp;</p>
                <p className="text-[#FF7373]">Pomodoro</p>
            </div>
            <div className="h-10 w-full mt-1.5 mb-1 bg-[#3D3C3C]">

                <div style={{ width: `${getMonthCompletion(currentMonthPomodoroMinutes)}%` }} className={`h-full max-w-full bg-[#FF7373]`}></div>
            </div>
            <p className="text-[1.1rem]">{getFormattedMinutes()}</p>
        </div>
    )
}