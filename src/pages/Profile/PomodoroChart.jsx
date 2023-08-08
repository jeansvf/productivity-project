import { useProfileContext } from "../../contexts/ProfileContext"
import Month from "./Month"

export default function PomodoroChart() {
    const { userPomodoros, dates, userInfo } = useProfileContext()

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const getMonthCompletion = (minutes) => {
        let hours = minutes / 60
        return (hours / (userInfo.plannedHours * 30)) * 100
    }

    return (
        <div className="text-white mt-20 max-sm:w-[99%]">
            <p className="text-lg font-medium">Pomodoro Studying</p>

            <div className="flex justify-center h-36 pt-2 pb-1 overflow-x-auto rounded-md border-[1px] px-1 border-white max-sm:justify-between">
                {dates.map((date, index) => <Month month={date} completion={"0"} key={index} />)}

                {userPomodoros ? userPomodoros.map((pomodoro, index) => <Month month={months[new Date(pomodoro.date).getMonth()]} completion={`${getMonthCompletion(pomodoro.minutes)}%`} key={index} />) : null}
            </div>
        </div>
    )
}