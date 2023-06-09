import PomodoroChart from "./PomodoroChart"
import UserInfo from "./UserInfo"

export default function Profile() {
    return (
        <main className="flex flex-col w-full h-screen pt-36 bg-[#393939] items-center">
            <UserInfo />
            <PomodoroChart />
        </main>
    )
}