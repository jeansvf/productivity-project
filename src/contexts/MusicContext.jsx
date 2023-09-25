import { createContext, useContext, useState } from "react"
import { backgrounds } from "../pages/Music/backgrounds"

const MusicContextProvider = createContext()

export default function MusicContext({ children }) {
    const radios = {
        coffe_shop: {
            name: "Coffee Shop Radio ☕ - 24/7 lofi & jazzy hip-hop beats",
            url: "https://www.youtube.com/watch?v=lP26UCnoH9s&ab_channel=STEEZYASFUCK"
        },
        synthwave: {
            name: "synthwave radio 🌌 - beats to chill/game to",
            url: "https://www.youtube.com/watch?v=4xDzrJKXOOY&ab_channel=LofiGirl",
        },
        lofi_hip_hop: {
            name: "lofi hip hop radio 📚 - beats to relax/study to",
            url: "https://www.youtube.com/watch?v=jfKfPfyJRdk&ab_channel=LofiGirl",
        },
        sleep: {
            name: "lofi hip hop radio 💤 - beats to sleep/chill to",
            url: "https://www.youtube.com/watch?v=rUxyKA_-grg&ab_channel=LofiGirl",
        }
    }

    const [error, setError] = useState("")
    const [playerSettings, setPlayerSettings] = useState({
        isVideoPlaying: false,
        url: radios.lofi_hip_hop.url,
        currentRadio: radios.lofi_hip_hop.name,
        volume: JSON.parse(localStorage.getItem("music_settings"))?.volume ? JSON.parse(localStorage.getItem("music_settings"))?.volume : .5,
        background: JSON.parse(localStorage.getItem("music_settings"))?.background ? JSON.parse(localStorage.getItem("music_settings"))?.background : "gifs/coffe.gif",
    })
    const [isShowing, setIsShowing] = useState({
        volumeInput: false,
        radiosMenu: false,
    })

    const skipRadio = () => {
        let currentKey = 0
        let currentRadios = Object.entries(radios)
        for(let i = 0; i < currentRadios.length; i++) {
            if(currentRadios[i][1].url == playerSettings.url) {
                break
            }
            currentKey++
        }

        let randomRadio
        if(currentKey < 3) {
            randomRadio = Object.values(radios)[currentKey + 1]
        } else {
            randomRadio = Object.values(radios)[0]
        }

        setPlayerSettings({ ...playerSettings, 
            currentRadio: randomRadio.name,
            url: randomRadio.url,
        })
        setError("There was an error with the selected radio")
    }

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

    const changeVolume = (volume) => {
        let newMusicSettings = localStorage.getItem("music_settings") ? JSON.parse(localStorage.getItem("music_settings")) : {}
        newMusicSettings.volume = parseFloat(volume)

        localStorage.setItem("music_settings", JSON.stringify(newMusicSettings))
        
        setPlayerSettings({ ...playerSettings, volume: parseFloat(volume) })
    }

    const value = {
        playerSettings,
        setPlayerSettings,
        changeBackground,
        radios,
        skipRadio,
        error,
        setError,
        isShowing,
        setIsShowing,
        changeVolume,
    }

    return (
        <MusicContextProvider.Provider value={value}>
            { children }
        </MusicContextProvider.Provider>
    )
}

export const useMusicContext = () => useContext(MusicContextProvider)