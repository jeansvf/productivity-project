import MonthPomodoroStatus from "./MonthPomodoroStatus"
import GoalsTab from "./GoalsTab"
import { useEffect } from "react"
import TodayPomodoroStatus from "./TodayPomodoroStatus"
import ReleaseNote from "./ReleaseNote"
import { releaseNotes } from "./release-notes"

export default function Home() {
    const date = new Date()
    
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    useEffect(() => {
        let localDate = JSON.parse(localStorage.getItem("daily_pomodoro"))?.date
        let currentDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

        if (currentDate != localDate || !localDate) {
            localStorage.setItem("daily_pomodoro", JSON.stringify({ date: currentDate, minutes: 0 }))
            return
        }

        
    }, [])

    const getNumberSuffix = (number) => {
        switch(true) {
            case (number < 21 && number > 3 || number  > 23 && number < 31):
                return "th"
            case (number == 1 || number == 21 || number == 31):
                return "st"
            case (number == 2 || number == 22):
                return "nd"
            case (number == 3 || number == 23):
                return "rd"
        }
    }

    return (
        <div className="flex w-full min-h-screen justify-center pt-24 bg-[#393939] z-10 text-white max-lg:pb-12 max-lg:flex-col max-lg:items-center">
            <div>
                <MonthPomodoroStatus months={months} />
                <TodayPomodoroStatus />
            </div>

            <div className="mx-24 max-lg:mx-0 max-lg:my-10">
                <h1 className="text-4xl text-center">{weekDays[date.getDay()]}, {months[date.getMonth()]} {`${date.getDate()}${getNumberSuffix(date.getDate())}`}</h1>
                
                {/* TODO: quote of the day
                <div className="flex items-center mt-4">
                    <p className="text-[#EBFF71] text-2xl">"quote of the day"&nbsp;</p>
                    <p className="text-2xl">- author</p>
                </div> */}

                <div className="flex flex-col items-center w-full justify-start mt-20 overflow-y-auto h-[74vh] scrollbar-hidden">
                    {releaseNotes.map((releaseNote) => (
                        <ReleaseNote releaseNote={releaseNote} key={releaseNote.version} />
                    ))}
                </div>
            </div>

            <GoalsTab />
        </div>
    )
}