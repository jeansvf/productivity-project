import { useLocation } from "react-router-dom";
import PomodoroView from "./PomodoroView/PomodoroView";
import { AnimatePresence } from "framer-motion";
import { useHintsContext } from "../../contexts/HintsContext";
import DisableViewsHint from "./PomodoroView/DisableViewsHint";
import MusicView from "./MusicView/MusicView";


export default function Views() {
    const location = useLocation()
    const { showHints, views } = useHintsContext()

    return (
        <div className="fixed z-50 right-0 bottom-0 mb-6 mr-6 flex flex-col items-end text-white">
            <AnimatePresence>
                {views.pomodoroView && location.pathname !== "/pomodoro" ? (
                    <PomodoroView />
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {views.musicView && location.pathname !== "/music" ? (
                    <MusicView />
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {showHints.disableViewsHint === true ? (
                    <DisableViewsHint />
                ) : null}
            </AnimatePresence>
        </div>
    )
}