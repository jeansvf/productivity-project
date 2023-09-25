import { useTimerContext }  from "../../contexts/TimerContext"
import { IoMdClose } from "react-icons/io"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { motion } from "framer-motion"
import { useHintsContext } from "../../contexts/HintsContext"

export default function PomodoroView() {
    const { minutes, seconds, isPaused, startTimer, pauseTimer } = useTimerContext()
    const { setShowHints, showHints, views, setViews } = useHintsContext()

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
            whileHover={{ width: "18rem" }}
            className="flex items-center justify-end w-[16rem] h-[4.5rem] my-1 bg-[#262626] font-rubik font-medium text-white border-2 border-white rounded-xl overflow-hidden"
        >
            <button
                onClick={() => {
                    setViews({ ...views, pomodoroView: false })
                    showHints.disableViewsHint === "disabled" ? null : setShowHints({ ...showHints, disableViewsHint: true })
                }}
                className="ml-12 mr-1.5 text-2xl hover:bg-opacity-10 hover:bg-white"
                type="button"
            >
                <IoMdClose />
            </button>

            <p className="min-w-[10rem] text-start text-[3.6rem] leading-[3rem] pl-1 pointer-events-none">{minutes < 10 && minutes.toString().length == 1 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</p>
            
            <button
                onClick={() => isPaused ? startTimer() : pauseTimer()}
                className="flex justify-center items-center ml-6 mr-3 min-w-[3rem] min-h-[3rem] text-[2.75rem] bg-[#FF7373] rounded-lg"
                type="button"
            >
                {isPaused ? <BsPlayFill /> : <BsPauseFill />}
            </button>
        </motion.div>
    )
}