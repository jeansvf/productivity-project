import { signOut } from "firebase/auth"
import PomodoroChart from "./PomodoroChart"
import UserInfo from "./UserInfo"
import { auth } from "../../firebase-config"
import { useState } from "react"
import Settings from "./Settings/Settings"

export default function Profile() {
    const [showSettings, setShowSettings] = useState(false)
    return (
        <main className="flex w-full pt-36 bg-[#393939] items-center text-white">
            <div className="w-full flex flex-col items-center mx-auto">
                <UserInfo />
                <PomodoroChart />
                <div className="flex items-center mt-3 text-[#bfbfbf] underline">
                    <button onClick={() => setShowSettings(!showSettings)} className="mr-4 cursor-pointer hover:text-white" type="button">Settings</button>
                    <button onClick={() => signOut(auth).then(() => window.location.reload(false))} className="cursor-pointer hover:text-white" type="button">Sign Out</button>
                </div>
            </div>

            {/* TODO: add animation when opening settings */}

            {showSettings ? (
                <>
                    <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[1px] h-[44rem] mt-10 bg-white opacity-60"></div>
                    <Settings />
                </>
            ) : null}
        </main>
    )
}