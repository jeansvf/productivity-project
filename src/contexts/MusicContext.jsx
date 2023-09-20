import { createContext, useContext, useState } from "react"
import { backgrounds } from "../pages/Music/backgrounds"

const MusicContextProvider = createContext()

export default function MusicContext({ children }) {
    const [playerSettings, setPlayerSettings] = useState({
        isVideoPlaying: false,
        url: "https://www.youtube.com/watch?v=jfKfPfyJRdk&ab",
        currentRadio: "lofi hip hop radio 📚 - beats to relax/study to",
        volume: JSON.parse(localStorage.getItem("music_settings"))?.volume ? JSON.parse(localStorage.getItem("music_settings"))?.volume : .5,
        background: JSON.parse(localStorage.getItem("music_settings"))?.background ? JSON.parse(localStorage.getItem("music_settings"))?.background : "gifs/coffe.gif"
    })

    const changeBackground = () => {
        const randomBackground = backgrounds[Math.floor(Math.random()*backgrounds.length)]

        if (randomBackground == playerSettings.background) {
            changeBackground()
            return
        }

        let newMusicSettings = localStorage.getItem("music_settings") ? JSON.parse(localStorage.getItem("music_settings")) : {}
        newMusicSettings.background = randomBackground

        localStorage.setItem("music_settings", JSON.stringify(newMusicSettings))

        setPlayerSettings({ ...playerSettings, background: randomBackground })
    }

    const value = {
        playerSettings,
        setPlayerSettings,
        changeBackground,
    }

    return (
        <MusicContextProvider.Provider value={value}>
            { children }
        </MusicContextProvider.Provider>
    )
}

export const useMusicContext = () => useContext(MusicContextProvider)