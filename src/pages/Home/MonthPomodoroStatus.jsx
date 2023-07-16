import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "../../firebase-config"

export default function MonthPomodoroStatus({ months }) {
    const [currentMonthPomodoroMinutes, setCurrentMonthPomodoroMinutes] = useState(0)

    // TODO: check if it is possible to get pomodoro from timer context
    useEffect(() => {
        getDocs(query(collection(db, `users/${auth.currentUser.uid}/pomodoro`), where("date", "==", getDate()))).then((response) => {
            response.docs.map((data) => setCurrentMonthPomodoroMinutes(data.data().minutes))
        })
    }, [])

    const getDate = () => {
        let today = new Date()
        return `${(today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)}-${today.getFullYear()}`
    }

    const getCurrentMonth = () => {
        let today = new Date()
        return months[today.getMonth()]
    }

    const getFormattedMinutes = () => {
        return currentMonthPomodoroMinutes < 60 ? `${currentMonthPomodoroMinutes} minutes` : `${(currentMonthPomodoroMinutes / 60).toFixed(1)} hours`
    }

    return (
        <div className="w-72 px-3.5 py-3 rounded-md bg-[#2E2E2E] font-bold">
            <div className="flex items-center text-xl">
                <p>{getCurrentMonth()}&nbsp;</p>
                <p className="text-[#FF7373]">Pomodoro</p>
            </div>
            <div className="h-10 w-full mt-1.5 mb-1 bg-[#3D3C3C]">
                {/* TODO: add width based on user preference */}
                <div style={{ width: `${currentMonthPomodoroMinutes}%` }} className={`h-full max-w-full bg-[#FF7373]`}></div>
            </div>
            <p className="text-[1.1rem]">{getFormattedMinutes()}</p>
        </div>
    )
}