import { AnimatePresence, motion } from "framer-motion";
import { IoVolumeMedium, IoVolumeOff } from "react-icons/io5";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { useMusicContext } from "../../contexts/MusicContext";
import { FaImages } from "react-icons/fa";
import { PiRadio } from "react-icons/pi";

export default function PlayerControls({ isShowing, setIsShowing }) {
    const { playerSettings, setPlayerSettings, changeBackground } = useMusicContext()

    const changeVolume = (volume) => {
        let newMusicSettings = localStorage.getItem("music_settings") ? JSON.parse(localStorage.getItem("music_settings")) : {}
        newMusicSettings.volume = parseFloat(volume)

        localStorage.setItem("music_settings", JSON.stringify(newMusicSettings))
        
        setPlayerSettings({ ...playerSettings, volume: parseFloat(volume) })
    }

    return (
        <div className='fixed flex items-center justify-center w-[99%] h-12 mb-2 rounded-lg border border-white border-opacity-30 bg-[#111111] bg-opacity-80 bottom-0 max-sm:mb-1 max-sm:w-[98%]' style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
            <button onClick={() => setIsShowing({ ...isShowing, radiosMenu: !isShowing.radiosMenu })} type="button" className="text-2xl mr-auto ml-5">
                <PiRadio className="select-none" />
            </button>

            <div className="absolute flex items-center left-1/2 -translate-x-1/2">
                <button type="button" className="text-lg mr-3">
                    <FaImages onClick={() => changeBackground()} />
                </button>

                <button type='button' className="text-[2.4rem]" onClick={() => setPlayerSettings({ ...playerSettings, isVideoPlaying: !playerSettings.isVideoPlaying })}>
                    {playerSettings.isVideoPlaying ? <BsPauseFill /> : <BsPlayFill />}
                </button>

                <div className="relative w-6 h-6">
                    <button onMouseEnter={() => setIsShowing({ ...isShowing, volumeInput: true })} onMouseLeave={() => setIsShowing({ ...isShowing, volumeInput: false })} type='button' className='absolute left-0 top-0 flex items-center text-2xl ml-[.2rem]'>
                        {playerSettings.volume == 0 ? <IoVolumeOff onClick={() => setPlayerSettings({ ...playerSettings, volume: .5 })} /> : <IoVolumeMedium className="ml-[.239rem]" onClick={() => setPlayerSettings({ ...playerSettings, volume: 0 })} />}
                    <AnimatePresence>
                        {isShowing.volumeInput ? (
                            <motion.input initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onChange={(e) => changeVolume(e.target.value)} value={playerSettings.volume} min="0" max="1" step=".1" type="range" className="ml-2 cursor-pointer origin-left accent-white w-20" />
                        ) : null}
                    </AnimatePresence>
                    </button>
                </div>
            </div>
        </div>
    )
}