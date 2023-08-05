import { motion } from "framer-motion";
import { IoIosAdd } from "react-icons/io";

export default function NoGoalsMessage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute ml-11 mt-14 z-50"
        >
            <p className="text-[2.5rem] leading-10 opacity-50 font-semibold text-white">You don’t have any Goals!</p>
            <div className="flex items-center ml-0.5 mt-4 text-2xl opacity-50 font-semibold text-white">
                <p>Press the&nbsp;</p>
                <div className="w-7 h-7 rounded-full bg-white text-black">
                    <IoIosAdd className="w-full h-full" />
                </div>
                <p>&nbsp;button to create a goal</p>
            </div>
        </motion.div>
    )
}