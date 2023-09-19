import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

export default function CloseSettingsButton({ setPomodoroConfigOpened }) {
    return (
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
    )
}