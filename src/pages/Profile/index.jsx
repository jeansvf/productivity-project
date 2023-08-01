import { signOut } from "firebase/auth"
import PomodoroChart from "./PomodoroChart"
import UserInfo from "./UserInfo"
import { auth } from "../../firebase-config"
import { Link } from "react-router-dom"

export default function Profile() {
    return (
        <main className="flex flex-col w-full h-screen pt-36 bg-[#393939] items-center">
            <UserInfo />
            <PomodoroChart />
            
            <div className="flex items-center mt-3 text-[#bfbfbf] underline">
                <Link to="/settings" className="mr-4 cursor-pointer hover:text-white">Change Settings</Link>
                <p onClick={() => signOut(auth).then(() => window.location.reload(false))} className="cursor-pointer hover:text-white">Sign Out</p>
            </div>
        </main>
    )
}