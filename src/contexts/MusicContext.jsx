import { createContext, useContext, useState } from "react"

const MusicContextProvider = createContext()

export default function MusicContext({ children }) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [volume, setVolume] = useState(.5)

    const value = {
        isVideoPlaying,
        setIsVideoPlaying,
        volume,
        setVolume,
    }

    return (
        <MusicContextProvider.Provider value={value}>
            { children }
        </MusicContextProvider.Provider>
    )
}

// music context hook
export const useMusicContext = () => useContext(MusicContextProvider)