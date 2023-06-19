import { AnimatePresence, motion } from "framer-motion"
import { BsCheck } from "react-icons/bs"
import CompletedTask from "./CompletedTask"

export default function CompletedGoal({ goal }) {
    return (
        <motion.div
        initial={{
            opacity: "0%"
        }}
        animate={{
            opacity: "70%"
        }}
        exit={{
            opacity: "0%"
        }} className="flex flex-col relative w-80 h-[19rem] mx-3 my-2 bg-[#2D2D2D] rounded-lg">

            <div className="w-full justify-between items-center px-3">
                <p className="font-bold my-[.3rem] bg-transparent">{goal.title}</p>
            </div>

            <div id="goal-tasks-window" className="pb-24 px-3">
                {goal?.tasks?.map((task, taskIndex) => (
                    <CompletedTask task={task} key={taskIndex} />
                ))}
            </div>

                
            <div className="flex absolute bottom-0 flex-col justify-center items-center w-full h-[4.55rem] pt-1 rounded-bl-lg rounded-br-lg text-black bg-[#1E1E1E]">
                <AnimatePresence>
                    <motion.div>
                        <BsCheck className="w-10 h-10 bg-[#73FFA3] rounded-full" />
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    )
}