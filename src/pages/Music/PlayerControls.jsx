import { AnimatePresence, motion } from "framer-motion";
import { IoVolumeMedium, IoVolumeOff } from "react-icons/io5";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { useMusicContext } from "../../contexts/MusicContext";
import { FaImages } from "react-icons/fa";
import { PiRadio } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { useHintsContext } from "../../contexts/HintsContext";

export default function PlayerControls() {
    const { playerSettings, setPlayerSettings, changeBackground, error, setError, isShowing, setIsShowing, changeVolume } = useMusicContext()
    const { setViews, views } = useHintsContext()

    return (
        <div className='fixed flex items-center justify-center w-[99%] h-12 mb-2 rounded-lg border border-white border-opacity-30 bg-[#111111] bg-opacity-75 bottom-0 max-sm:mb-1 max-sm:w-[98%]' style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
            <div className="flex items-center mr-auto ml-5">
                <button onClick={() => setIsShowing({ ...isShowing, radiosMenu: !isShowing.radiosMenu })} type="button" className="text-2xl">
                    <PiRadio className="select-none" />
                </button>
                <AnimatePresence>
                    {error ? (
                        <motion.span
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1
                            }}
                            exit={{
                                opacity: 0
                            }}
                            onClick={() => setError("")}
                            className="flex items-center ml-4 text-base text-red-400 hover:text-red-500 cursor-pointer"
                        >
                            {error}
                            <IoMdClose className="text-xl ml-[.12rem] mt-[.08rem]" />
                        </motion.span>
                    ) : null}
                </AnimatePresence>
            </div>

            <div className="absolute flex items-center left-1/2 -translate-x-1/2">
                <button type="button" className="text-lg mr-3">
                    <FaImages onClick={() => changeBackground()} />
                </button>

                <button 
                    onClick={() => {
                        playerSettings.isVideoPlaying ? setViews({ ...views, musicView: false }) : setViews({ ...views, musicView: true }) 
                        setPlayerSettings({ ...playerSettings, isVideoPlaying: !playerSettings.isVideoPlaying })
                    }}
                    type='button' 
                    className="text-[2.4rem]" 
                >
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