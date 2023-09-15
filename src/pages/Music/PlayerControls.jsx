import { AnimatePresence, motion } from "framer-motion";
import { IoVolumeMedium, IoVolumeOff } from "react-icons/io5";
import { useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { useMusicContext } from "../../contexts/MusicContext";
import { FaImages } from "react-icons/fa";

export default function PlayerControls() {
    const [isVolumeInputShowing, setIsVolumeInputShowing] = useState(false)

    const { isVideoPlaying, setIsVideoPlaying, volume, setVolume, changeBackground } = useMusicContext()

    const changeVolume = (volume) => {
        // change volume in localStorage
        let newMusicSettings = localStorage.getItem("music_settings") ? JSON.parse(localStorage.getItem("music_settings")) : {}
        newMusicSettings.volume = parseFloat(volume)

        localStorage.setItem("music_settings", JSON.stringify(newMusicSettings))
        
        // change volume in state
        setVolume(parseFloat(volume))
    }

    return (
        <div className='fixed bottom-3 flex items-center justify-center w-[99%] h-12 rounded-lg border border-white border-opacity-30 bg-[#111111] bg-opacity-80 max-sm:bottom-1 max-sm:w-[97%]' style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
            <button type="button" className="text-lg mr-3">
                <FaImages onClick={() => changeBackground()} />
            </button>

            <button type='button' className="text-[2.4rem]" onClick={() => setIsVideoPlaying(prev => !prev)}>
                {isVideoPlaying ? <BsPauseFill /> : <BsPlayFill />}
            </button>

            <div className="relative w-6 h-6">
                <button onMouseEnter={() => setIsVolumeInputShowing(true)} onMouseLeave={() => setIsVolumeInputShowing(false)} type='button' className='absolute left-0 top-0 flex items-center text-2xl ml-[.2rem]'>
                    {volume == 0 ? <IoVolumeOff onClick={() => setVolume(.5)} /> : <IoVolumeMedium className="ml-[.239rem]" onClick={() => setVolume(0)} />}
                <AnimatePresence>
                    {isVolumeInputShowing ? (
                        <motion.input initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onChange={(e) => changeVolume(e.target.value)} value={volume} min="0" max="1" step=".1" type="range" className="ml-2 cursor-pointer origin-left accent-white w-20" />
                    ) : null}
                </AnimatePresence>
                </button>
            </div>
        </div>
    )
}