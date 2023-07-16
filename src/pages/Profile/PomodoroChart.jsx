import { useProfileContext } from "../../contexts/ProfileContext"
import Month from "./Month"

export default function PomodoroChart() {
    const { userPomodoros, dates, userInfo } = useProfileContext()

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const capitalize = (text) => {
        return `${text[0].toUpperCase()}${text.slice(1)}`
    }

    const getMonthCompletion = (minutes) => {        
        let hours = minutes / 60

        return (hours / userInfo.plannedHours) * 100
    }

    return (
        <div className="text-white mt-20">
            <p className="text-lg font-medium">Pomodoro Studying</p>

            <div className="flex h-36 pt-2 pb-1 rounded-md border-[1px] px-1 border-white">
                {dates.map((date, index) => <Month month={capitalize(date)} completion={"0"} key={index} />)}
                
                {/* TODO: set real completion based on the user limit */}
                {userPomodoros ? userPomodoros.map((pomodoro, index) => <Month month={months[new Date(pomodoro.date).getMonth()]} completion={`${getMonthCompletion(pomodoro.minutes)}%`} key={index} />) : null}
            </div>
        </div>
    )
}