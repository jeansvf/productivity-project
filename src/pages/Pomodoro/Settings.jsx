import { easeIn, motion } from "framer-motion";

export default function Settings({setPomodoroConfigOpened}) {
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
        className="absolute">
            baba
            <button onClick={() => setPomodoroConfigOpened(false)}>sai</button>
        </motion.div>
    )
}