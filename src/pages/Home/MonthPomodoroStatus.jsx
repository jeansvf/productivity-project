import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "../../firebase-config"

export default function MonthPomodoroStatus() {
    const [monthPomodoroMinutes, setMonthPomodoroMinutes] = useState(0)

    // TODO: check if it is possible to get pomodoro from timer context
    useEffect(() => {
        getDocs(query(collection(db, `users/${auth.currentUser.uid}/pomodoro`), where("date", "==", getDate()))).then((response) => {
            response.docs.map((data) => setMonthPomodoroMinutes(data.data().minutes))
        })
    }, [])

    const getDate = () => {
        let today = new Date()
        return `${(today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)}-${today.getFullYear()}`
    }

    return (
        <div className="w-72 px-3.5 py-3 rounded-md bg-[#2E2E2E] font-bold">
            <div className="flex items-center text-xl">
                <p>May&nbsp;</p>
                <p className="text-[#FF7373]">Pomodoro</p>
            </div>
            <div className="h-10 w-full mt-1.5 mb-1 bg-[#3D3C3C]">
                {/* TODO: add width based on user preference */}
                <div style={{ width: `${monthPomodoroMinutes}%` }} className={`h-full bg-[#FF7373]`}></div>
            </div>
            <p className="text-[1.1rem]">8 hours</p>
        </div>
    )
}