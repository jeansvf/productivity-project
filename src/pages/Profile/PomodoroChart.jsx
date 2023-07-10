import { useEffect, useState } from "react";
import { useProfileContext } from "../../contexts/ProfileContext"
import Month from "./Month"

export default function PomodoroChart() {
    const { userPomodoros } = useProfileContext()

    const [dates, setDates] = useState([])

    var currentDate = new Date();

    useEffect(() => {
        for (var i = 1; i <= 11; i++) {
            // Get the month and year of the current date
            var currentMonth = currentDate.getMonth();
            var currentYear = currentDate.getFullYear();
    
            // Subtract i months from the current date
            var pastDate = new Date(currentYear, currentMonth - i, 1);
    
            // Extract the month and year from the past date
            var pastMonth = pastDate.toLocaleString('default', { month: 'long' });
            var pastYear = pastDate.getFullYear();
    
            // Print the past month and year
            let month = pastMonth + ' ' + pastYear
    
            let finalMonth = month.charAt(0) + month.charAt(1) + month.charAt(2)
            
            console.log(i, finalMonth);
    
            setDates([...dates, finalMonth])
        }
    }, [])
   
    useEffect(() => {
        console.log(dates);
    }, [dates])
    
    return (
        <div className="text-white mt-20">
            <p className="text-lg font-medium">Pomodoro Studying</p>

            <div className="flex h-36 pt-2 pb-1 rounded-md border-[1px] px-1 border-white">
                <Month month={"Jan"} completion={"100%"} />
                <Month month={"Jan"} completion={"100%"} />
                <Month month={"Jan"} completion={"100%"} />
                <Month month={"Jan"} completion={"100%"} />
                <Month month={"Jan"} completion={"100%"} />
                <Month month={"Jan"} completion={"100%"} />
                <Month month={"Jan"} completion={"100%"} />
                <Month month={"Jan"} completion={"100%"} />
                <Month month={"Jan"} completion={"100%"} />
                <Month month={"Jan"} completion={"100%"} />
                <Month month={"Jan"} completion={"100%"} />
                <Month month={"Jan"} completion={"100%"} />
            </div>
        </div>
    )
}