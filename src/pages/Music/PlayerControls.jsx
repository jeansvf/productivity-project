import { AnimatePresence, motion } from "framer-motion";
import { HiForward, HiPause, HiPlay } from "react-icons/hi2";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { useState } from "react";
import { BiDice3 } from "react-icons/bi";
import { useMusicContext } from "../../contexts/MusicContext";

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
        <div className='absolute bottom-10 flex items-center justify-center p-1 rounded-md bg-opacity-30'>
            <button type='button' className='w-8 h-8 ml-1' onClick={() => setIsVideoPlaying(prev => !prev)}>
                {isVideoPlaying ? <HiPause className='w-full h-full stroke-1 stroke-black' /> : <HiPlay className='w-full h-full stroke-1 stroke-black' />}
            </button>

            <button type='button' className='w-8 h-8 mx-1'>
                <HiForward stroke='2' className='w-full h-full stroke-1 stroke-black' />
            </button>

            <button type="button" className='w-8 h-8 mx-1'>
                <BiDice3 onClick={() => changeBackground()} stroke="2" className='w-full h-full stroke-1 stroke-black' />
            </button>

            <div>
                <button onMouseEnter={() => setIsVolumeInputShowing(true)} onMouseLeave={() => setIsVolumeInputShowing(false)} type='button' className='flex items-center mx-1 h-7'>
                    {volume == 0 ? <HiVolumeOff onClick={() => setVolume(.5)} className='w-full h-full stroke-1 stroke-black' /> : <HiVolumeUp onClick={() => setVolume(0)} className='w-full h-full stroke-1 stroke-black' />}
                    <AnimatePresence>
                        {isVolumeInputShowing ? (
                            <motion.input onChange={(e) => changeVolume(e.target.value)} initial={{width: 0}} animate={{width: "5rem"}} exit={{width: 0}} transition={{duration: .2}} value={volume} min="0" max="1" step=".1" type="range" className="ml-2 cursor-pointer origin-left accent-white w-20" />
                        ) : null}
                    </AnimatePresence>
                </button>
            </div>
        </div>
    )
}