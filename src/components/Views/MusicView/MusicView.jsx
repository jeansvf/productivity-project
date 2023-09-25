import { motion } from "framer-motion";
import { useMusicContext } from "../../../contexts/MusicContext";
import PlayerControls from "./PlayerControls";
import NowPlaying from "./NowPlaying";
import CloseButton from "./CloseButton";
import { useState } from "react";

export default function MusicView() {
    const { playerSettings } = useMusicContext()
    const [showCloseButton, setShowCloseButton] = useState(false)

    return (
        <motion.div
            initial={{
                x: "110%",
            }}
            animate={{
                x: 0,
                transition: {
                    delay: .4,
                    duration: 1,
                    ease: "circOut",
                }
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: .1,
                    ease: "circOut",
                }
            }}
            onMouseEnter={() => setShowCloseButton(true)}
            onMouseLeave={() => setShowCloseButton(false)}
            style={{ backgroundImage: `url(${playerSettings.background})`, backgroundColor: "#262626" }}
            className="relative flex flex-col justify-end items-center min-w-[22rem] max-w-[22rem] h-[12rem] my-1 font-rubik font-medium text-white border-2 border-white rounded-xl bg-cover bg-center bg-no-repeat"
        >
            {showCloseButton ? <CloseButton /> : null}

            <NowPlaying />

            <PlayerControls />
        </motion.div>
    )
}