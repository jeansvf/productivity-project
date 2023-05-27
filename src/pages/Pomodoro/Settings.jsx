import { AnimatePresence, color, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useTimerContext } from "../../contexts/TimerContext";
import { useState } from "react";

export default function Settings({setPomodoroConfigOpened}) {
    const [selectedTimer, setSelectedTimer] = useState("pomodoro")
    const [dropDownMenu, setDropDownMenu] = useState(false)

    const { customizeTimer, pomodoroMinutes, longBreakMinutes, shortBreakMinutes } = useTimerContext()

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
                <button onClick={() => setSelectedTimer("pomodoro")} className={`py-1 px-2 rounded-[0.3rem] text-black ${selectedTimer == "pomodoro" ? "bg-[#FF8282]" : "text-white"}`} type="button">Pomodoro</button>
                <button onClick={() => setSelectedTimer("long_break")} className={`py-1 px-2 rounded-[0.3rem] text-black ${selectedTimer == "long_break" ? "bg-[#fff082]" : "text-white"} `} type="button">Long Break</button>
                <button onClick={() => setSelectedTimer("short_break")} className={`py-1 px-2 rounded-[0.3rem] text-black ${selectedTimer == "short_break" ? "bg-[#84FF82]" : "text-white"}`} type="button">Short Break</button>
            </div>
            <div className="relative text-6xl">
                <input onChange={(event) => event.target.value < 100 ? customizeTimer(selectedTimer, event.target.value) : null} value={selectedTimer == "pomodoro" ? pomodoroMinutes : selectedTimer == "long_break" ? longBreakMinutes : selectedTimer == "short_break" ? shortBreakMinutes : ""} className="flex bg-black bg-opacity-30 rounded-lg w-52 my-5 px-4" />
                <span className="absolute pointer-events-none -translate-y-1/2 top-1/2 right-5">:00</span>
            </div>
            <div className="flex text-xl">
                <p className="self-center">Alarm Sound:</p>
                <div className="mx-2 flex-col relative">
                    <button onClick={() => setDropDownMenu(!dropDownMenu)} className={`flex items-center justify-between py-1 px-2 ${dropDownMenu ? "rounded-tl-[0.3rem] rounded-tr-[0.3rem]" : "rounded-[0.3rem]"} overflow-hidden text-white bg-black bg-opacity-30`} type="button">
                        Cartoon
                        <BsFillCaretDownFill className="pl-1" />
                    </button>

                    {/* DROPDOWN MENU */}
                    <AnimatePresence>
                        {dropDownMenu ? (
                            <motion.div
                            initial={{
                                y: -50,
                                opacity: 0
                            }}
                            animate={{
                                y: 0,
                                opacity: 100
                            }}
                            exit={{
                                y: -20,
                                opacity: 0,
                                transition:{
                                    duration: .1
                                }
                            }} className="absolute left-0 w-full">
                                <button onClick={() => setDropDownMenu(false)} className={`w-full flex items-center py-1 px-2 text-white bg-black bg-opacity-30 hover:bg-opacity-10`} type="button">
                                    Cartoon
                                </button>
                                <button onClick={() => setDropDownMenu(false)} className={`w-full flex items-center py-1 px-2 rounded-bl-[0.3rem] rounded-br-[0.3rem] text-white bg-black bg-opacity-30 hover:bg-opacity-10`} type="button">
                                    Arcade
                                </button>
                            </motion.div> ) : null}    
                    </AnimatePresence>
                </div>
                <motion.button
                    initial={{
                        scale: 0,
                    }}
                    animate={{
                        scale: 1,
                    }}
                    transition={{
                        duration: .8,
                        type: "spring"
                    }}
                    onClick={() => setPomodoroConfigOpened(false)} className="text-[2rem] p-[.125rem] rounded-[0.3rem] cursor-pointer hover:bg-opacity-10 hover:bg-white">
                        <IoClose />
                </motion.button>
            </div>
        </motion.div>
    )
}