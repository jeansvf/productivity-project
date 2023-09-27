import { signOut } from "firebase/auth"
import PomodoroChart from "./PomodoroChart"
import UserInfo from "./UserInfo"
import { auth } from "../../firebase-config"
import { useState } from "react"
import Settings from "./Settings/Settings"
import { AnimatePresence, circOut, motion } from "framer-motion"
import { useMediaQuery } from "@mui/material"

export default function Profile() {
    const [showSettings, setShowSettings] = useState(false)
    const xl = useMediaQuery("(max-width: 1280px)")
    
    return (
        <main className="relative flex w-full h-full pt-36 bg-[#393939] items-center text-white max-xl:flex-col">
            <motion.div
                initial={{
                    translateX: "-50%",
                    translateY: "30%",
                }}
                animate={{
                    x: showSettings && !xl ? -340 : 0
                }}
                transition={{
                    ease: "circOut",
                    duration: .6
                }}
                className="absolute top-0 left-1/2 w-[38rem] flex flex-col items-center mx-auto max-xl:w-full"
            >
                <UserInfo />
                <PomodoroChart />
                <div className="flex items-center mt-3 text-[#bfbfbf] underline max-xl:mb-4">
                    <button onClick={() => setShowSettings(!showSettings)} className="mr-4 cursor-pointer hover:text-white" type="button">Settings</button>
                    <button onClick={() => signOut(auth).then(() => window.location.reload(false))} className="cursor-pointer hover:text-white" type="button">Sign Out</button>
                </div>
            </motion.div>

            <AnimatePresence>
            {showSettings ? (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: .6 }}
                        exit={{
                            opacity: 0,
                            transition: {
                                delay: 0,
                                duration: .1
                            }
                        }}
                        transition={{ delay: .2 }}
                        className="absolute left-1/2 top-24 w-[1px] h-[50rem] mt-5 bg-white max-xl:h-[1px] max-xl:mx-auto max-xl:w-[86vw] max-xl:static max-xl:mt-[35rem] max-sm:mt-[42rem]"
                    ></motion.div>
                    <Settings xl={xl} />
                </>
                ) : null}
            </AnimatePresence>
        </main>
    )
}