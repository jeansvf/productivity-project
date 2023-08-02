import { useProfileContext } from "../../contexts/ProfileContext"
import { useTimerContext } from "../../contexts/TimerContext"

export default function TodayPomodoroStatus() {
    const { todayPomodoroMinutes } = useTimerContext()
    const { userInfo } = useProfileContext()

    const getFormattedMinutes = (minutes) => {
        return minutes < 60 ? `${minutes} minutes` : `${(minutes / 60).toFixed(1)} hours`
    }

    const getDailyCompletion = (minutes) => {
        let hours = (minutes / 60).toFixed(1)
        return (hours / (userInfo.plannedHours)) * 100
    }

    return (
        <div className="flex w-72 h-44 px-3.5 py-3 mt-5 rounded-md bg-[#2E2E2E] font-bold">
            <div>
                <p className="flex text-xl">Today's</p>
                <p className="text-[#FF7373] text-xl">Pomodoro</p>
            </div>
            <div className="flex ml-auto">
                <p className="self-end leading-3 min-h-[10%] max-h-full mr-2 text-[1.1rem]" style={{ height: `${todayPomodoroMinutes ? getDailyCompletion(todayPomodoroMinutes) : 0}%` }}>{getFormattedMinutes(todayPomodoroMinutes)}</p>
                <div className="flex w-11 h-full mb-1 bg-[#3D3C3C]">
                    <div className="self-end w-full max-h-full bg-[#FF7373]" style={{ height: `${todayPomodoroMinutes ? getDailyCompletion(todayPomodoroMinutes) : 0}%` }}></div>
                </div>
            </div>
        </div>
    )
}