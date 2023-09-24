import { useState } from "react"
import PomodoroTimer from "./PomodoroTimer"
import Settings from "./Settings/Settings"
import { AnimatePresence } from "framer-motion"

export default function Pomodoro() {
    const [pomodoroConfigOpened, setPomodoroConfigOpened] = useState(false)

    return (
        <main className="flex items-center justify-center w-full h-screen bg-[#393939] z-10 text-white font-rubik font-medium">
            <AnimatePresence>
                {!pomodoroConfigOpened ? (
                    <PomodoroTimer setPomodoroConfigOpened={setPomodoroConfigOpened} />
                ): null}
            </AnimatePresence>
            
            <AnimatePresence>
                {pomodoroConfigOpened ? (
                    <Settings setPomodoroConfigOpened={setPomodoroConfigOpened} />
                ): null}
            </AnimatePresence>
        </main>
    )
}