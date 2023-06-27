import { createContext, useContext, useEffect, useState } from "react"
import { backgrounds } from "../pages/Music/backgrounds"

const MusicContextProvider = createContext()

export default function MusicContext({ children }) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)

    // set volume to localStorage volume, if undefined set to default
    const [volume, setVolume] = useState(JSON.parse(localStorage.getItem("music_settings"))?.volume ? JSON.parse(localStorage.getItem("music_settings"))?.volume : .5)
    
    // set background to localStorage background, if undefined set to default
    const [background, setBackground] = useState(JSON.parse(localStorage.getItem("music_settings"))?.background ? JSON.parse(localStorage.getItem("music_settings"))?.background : "https://i.giphy.com/media/798oH0WDEQnicM4857/giphy.webp")

    const changeBackground = () => {
        let newBackground = backgrounds[Math.floor(Math.random()*7)]

        // if background is the same as the previous one, run function again
        if (newBackground == background) {
            changeBackground()
            return
        }
        
        // change background in the localStorage
        let newMusicSettings = localStorage.getItem("music_settings") ? JSON.parse(localStorage.getItem("music_settings")) : {}
        newMusicSettings.background = newBackground
        
        localStorage.setItem("music_settings", JSON.stringify(newMusicSettings))

        // change background in the state
        setBackground(newBackground)
    }

    const value = {
        isVideoPlaying,
        setIsVideoPlaying,
        volume,
        setVolume,
        background,
        changeBackground
    }

    return (
        <MusicContextProvider.Provider value={value}>
            { children }
        </MusicContextProvider.Provider>
    )
}

// music context hook
export const useMusicContext = () => useContext(MusicContextProvider)