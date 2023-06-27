import { useTimerContext } from "../../contexts/TimerContext"
import { TbPlayerSkipForwardFilled } from "react-icons/tb"
import { IoSettingsSharp } from "react-icons/io5"
import { motion } from "framer-motion"

export default function PomodoroTimer({ setPomodoroConfigOpened }) {
    const { breakInfo, minutes, seconds, isPaused, startTimer, pauseTimer, goToPomodoro, goToBreak, skipTimer } = useTimerContext()

    return (
        <motion.div
        initial={{
            left: 0,
            opacity: 0
        }}
        animate={{
            left: "auto",
            opacity: 100,
            scale: 1,
            transition:{
                duration: .3,
                type: "spring",
            }
        }}
        exit={{
            right: 0,
            opacity: 0,
            transition:{
                duration: .1
            }
        }}
        className="absolute flex flex-col items-center">
            <div className="flex justify-between w-[24rem] text-xl">
                <button onClick={() => goToPomodoro("pause")} className={`py-1 px-2 rounded-[0.3rem] text-black ${breakInfo.timerType == "pomodoro" ? "bg-[#FF8282]" : "text-white"}`} type="button">Pomodoro</button>
                <button onClick={() => goToBreak("long_break")} className={`py-1 px-2 rounded-[0.3rem] text-black ${breakInfo.timerType == "long_break" ? "bg-[#fff082]" : "text-white"}`} type="button">Long Break</button>
                <button onClick={() => goToBreak("short_break")} className={`py-1 px-2 rounded-[0.3rem] text-black ${breakInfo.timerType == "short_break" ? "bg-[#84FF82]" : "text-white"}`} type="button">Short Break</button>
            </div>
            <p className="text-[9.5rem]">{minutes < 10 && minutes.toString().length == 1 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</p>
            {isPaused ? (
                <div className="flex relative items-center">
                    <div onClick={() => startTimer()} tabIndex="-1" className={`self-center py-[.4rem] cursor-pointer px-8 rounded-md text-2xl text-black font-normal hover:opacity-80 ${breakInfo.timerType == "pomodoro" ? "bg-[#FF7373]" : breakInfo.timerType == "short_break" ? "bg-[#8CFB8A]" : "bg-[#fff082]"}`}>start</div>
                    <motion.button
                    animate={{
                        rotate: 180
                    }}
                    transition={{
                        duration: .5
                    }}
                    onClick={() => setPomodoroConfigOpened(true)} className="absolute -right-[3.2rem] text-[1.6rem] p-2 rounded-[0.3rem] cursor-pointer hover:bg-opacity-10 hover:bg-white">
                        <IoSettingsSharp />
                    </motion.button>
                </div>
                    ) : (
                <div className="flex relative items-center">
                    <div onClick={() => pauseTimer()} tabIndex="-1" className={`py-[.4rem] cursor-pointer outline-none px-8 rounded-md text-2xl text-black font-normal hover:opacity-80 ${breakInfo.timerType == "pomodoro" ? "bg-[#FF7373]" : breakInfo.timerType == "short_break" ? "bg-[#8CFB8A]" : "bg-[#fff082]"}`}>pause</div>
                    <motion.button onClick={() => skipTimer()} className="absolute -right-[3.2rem] text-[1.7rem] p-2 rounded-[.3rem] cursor-pointer hover:bg-opacity-10 hover:bg-white">
                        <TbPlayerSkipForwardFilled />
                    </motion.button>
                </div>
            )}
        </motion.div>
    )
}