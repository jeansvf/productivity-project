import { AnimatePresence } from "framer-motion"
import { useHintsContext } from "../../contexts/HintsContext"
import { useTimerContext } from "../../contexts/TimerContext"
import NavigationHint from "./NavigationHint"
import RadiosMenuHint from "./RadiosMenuHint"
import { useMusicContext } from "../../contexts/MusicContext"
import { useLocation } from "react-router-dom"

export default function Hints() {
    const { isPaused } = useTimerContext()
    const { showHints } = useHintsContext()
    const { isShowing } = useMusicContext()
    const location = useLocation()

    return (
        <div className="fixed left-0 bottom-0 flex flex-col items-start pb-6 z-50 text-white">
            <div className="pl-6">
                {showHints.navigationHint && !isPaused && location.pathname == "/pomodoro" ? (
                    <NavigationHint />
                ) : null}
            </div>
            <AnimatePresence>
                {showHints.radiosMenuHint && !isShowing.radiosMenu && location.pathname == "/music" ? (
                    <div className='fixed bottom-0 w-[99%] mb-[3.75rem] max-sm:mb-14 max-sm:w-[98%]'>
                        <RadiosMenuHint />
                    </div>
                ) : null}
            </AnimatePresence>
        </div>
    )
}