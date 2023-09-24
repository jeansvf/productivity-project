import { useLocation } from "react-router-dom";
import PomodoroView from "./PomodoroView";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useHintsContext } from "../../contexts/HintsContext";
import DisableViewsHint from "../Hints/DisableViewsHint";

export default function Views() {
    const location = useLocation()
    const { showHints } = useHintsContext()

    const [views, setViews] = useState({
        pomodoroView: true,
        musicView: true,
    })

    return (
        <div className="fixed z-50 right-0 bottom-0 mb-6 mr-6 flex flex-col items-end text-white">
            <AnimatePresence>
                {views.pomodoroView && location.pathname !== "/pomodoro" ? (
                    <PomodoroView views={views} setViews={setViews} />
                ) : null}
            </AnimatePresence>
            
            <AnimatePresence>
                {showHints.disableViewsHint && !views.pomodoroView ? (
                    <DisableViewsHint />
                ) : null}
            </AnimatePresence>
        </div>
    )
}