import {useLocation} from "react-router-dom"
import PomodoroView from "./PomodoroView/PomodoroView"
import {AnimatePresence, motion} from "framer-motion"
import {useHintsContext} from "../../contexts/HintsContext"
import DisableViewsHint from "./PomodoroView/DisableViewsHint"
import MusicView from "./MusicView/MusicView"
import {useEffect, useRef} from "react"
import {useMediaQuery} from "@mui/material"

export default function Views() {
    const location = useLocation()
    const {showHints, views} = useHintsContext()
    const md = useMediaQuery("(max-width: 448px)")

    useEffect(() => {
        if (!md) {
            return
        }

        switch (true) {
            case views.pomodoroView && views.musicView:
                document.body.style.marginBottom = "23rem"
                break

            case views.pomodoroView && !views.musicView:
                document.body.style.marginBottom = "10rem"
                break

            case views.musicView && !views.pomodoroView:
                document.body.style.marginBottom = "20rem"
                break

            default:
                document.body.style.marginBottom = "0"
                break
        }
    }, [views.pomodoroView, views.musicView])

    return (
        <motion.div
            animate={{y: location.pathname == "/music" ? -53 : 0}}
            transition={{ease: "easeOut"}}
            className="fixed z-50 right-0 bottom-0 mb-6 mr-6 flex flex-col items-end text-white max-sm:mr-1 max-sm:mb-0 max-[300px]:mb-1"
        >
            <AnimatePresence>
                {views.pomodoroView === true &&
                views.hidePomodoroView === false &&
                location.pathname !== "/pomodoro" ? (
                    <PomodoroView />
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {views.musicView === true &&
                views.hideMusicView === false &&
                location.pathname !== "/music" ? (
                    <MusicView />
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {showHints.disableViewsHint === true ? (
                    <DisableViewsHint />
                ) : null}
            </AnimatePresence>
        </motion.div>
    )
}
