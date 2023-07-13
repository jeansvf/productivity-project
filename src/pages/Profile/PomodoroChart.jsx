import { useProfileContext } from "../../contexts/ProfileContext"
import Month from "./Month"

export default function PomodoroChart() {
    const { userPomodoros, dates } = useProfileContext()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const capitalize = (text) => {
        return `${text[0].toUpperCase()}${text.slice(1)}`
    }

    return (
        <div className="text-white mt-20">
            <p className="text-lg font-medium">Pomodoro Studying</p>

            <div className="flex h-36 pt-2 pb-1 rounded-md border-[1px] px-1 border-white">
                {dates.map((date, index) => <Month month={capitalize(date)} completion={"0"} key={index} />)}
                {userPomodoros ? userPomodoros.map((pomodoro, index) => <Month month={monthNames[new Date(pomodoro.date).getMonth()]} completion={`${pomodoro.minutes * 14}%`} key={index} />) : null}
            </div>
        </div>
    )
}