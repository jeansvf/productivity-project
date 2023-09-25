import { createContext, useContext, useState } from "react"

const HintsContextProvider = createContext(null)

export default function HintsContext({ children }) {
    const [showHints, setShowHints] = useState({
        navigationHint: JSON.parse(localStorage.getItem("hints"))?.navigationHint !== undefined ? JSON.parse(localStorage.getItem("hints"))?.navigationHint : true,
        radiosMenuHint: JSON.parse(localStorage.getItem("hints"))?.radiosMenuHint !== undefined ? JSON.parse(localStorage.getItem("hints"))?.radiosMenuHint : true,
        disableViewsHint: JSON.parse(localStorage.getItem("hints"))?.disableViewsHint !== undefined ? "disabled" : false,
    })

    const [views, setViews] = useState({
        pomodoroView: false,
        musicView: false,
    })

    const value = {
        showHints,
        setShowHints,
        views,
        setViews,
    }

    return (
        <HintsContextProvider.Provider value={value}>
            { children }
        </HintsContextProvider.Provider>
    )
}

export const useHintsContext = () => useContext(HintsContextProvider)