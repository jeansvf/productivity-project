import MonthPomodoroStatus from "./MonthPomodoroStatus"
import YesterdayPomodoroStatus from "./YesterdayPomodoroStatus"
import GoalsTab from "./GoalsTab"

export default function Home() {
    const date = new Date()
    
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

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
        <div className="flex w-full h-screen justify-center pt-52 bg-[#393939] z-10 text-white">
            <div>
                <MonthPomodoroStatus months={months} />
                <YesterdayPomodoroStatus />
            </div>

            <div id="testing-clip-parent" className="mx-24 pt-8">
                <h1 id="testing-clip" className="text-4xl text-center">{weekDays[date.getDay()]}, {months[date.getMonth()]} {`${date.getDate()}${getNumberSuffix(date.getDate())}`}</h1>
                {/* 
                TODO: quote of the day
                <div className="flex items-center mt-4">
                    <p className="text-[#EBFF71] text-2xl">"quote of the day"&nbsp;</p>
                    <p className="text-2xl">- author</p>
                </div> */}
            </div>

            <GoalsTab />
        </div>
    )
}