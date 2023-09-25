import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { FaImages } from "react-icons/fa";
import { IoVolumeMedium, IoVolumeOff } from "react-icons/io5";
import { useMusicContext } from "../../../contexts/MusicContext";
import { AnimatePresence, motion } from "framer-motion";

export default function PlayerControls() {
    const { changeBackground, playerSettings, setPlayerSettings, isShowing, setIsShowing, changeVolume } = useMusicContext()

    return (
        <div className="flex items-center justify-center w-[97%] h-10 mb-1 rounded-lg bg-black bg-opacity-50 border border-[#585858]" style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
            <button
                onClick={() => {changeBackground()}}
                className="text-lg mr-[.42rem]"
                type="button"
            >
                <FaImages />
            </button>

            <button
                onClick={() => setPlayerSettings({ ...playerSettings, isVideoPlaying: !playerSettings.isVideoPlaying })}
                className="text-[2.1rem]"
                type="button"
            >
                {playerSettings.isVideoPlaying ? <BsPauseFill /> : <BsPlayFill />}
            </button>

            <div className="relative w-6 h-6">
                <button
                    onClick={() => {}}
                    onMouseEnter={() => setIsShowing({ ...isShowing, volumeInput: true })} onMouseLeave={() => setIsShowing({ ...isShowing, volumeInput: false })}
                    className="absolute left-0 top-0 flex items-center text-2xl ml-[.2rem]"
                    type="button"
                >
                    {playerSettings.volume == 0 ? <IoVolumeOff onClick={() => setPlayerSettings({ ...playerSettings, volume: .5 })} /> : <IoVolumeMedium className="ml-[.244rem]" onClick={() => setPlayerSettings({ ...playerSettings, volume: 0 })} />}
                    
                    <AnimatePresence>
                        {isShowing.volumeInput ? (
                            <motion.input initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onChange={(e) => changeVolume(e.target.value)} value={playerSettings.volume} min="0" max="1" step=".1" type="range" className="absolute ml-[1.8rem] cursor-pointer origin-left accent-white w-20" />
                        ) : null}
                    </AnimatePresence>
                </button>
            </div>
        </div>
    )
}