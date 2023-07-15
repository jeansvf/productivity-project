import { motion } from "framer-motion";

export default function TabGoalProgress({ goalProgress }) {
    return (
        <div className="flex flex-col items-center w-full mt-auto px-2 pb-0.5 rounded-bl-lg rounded-br-lg bg-[#1E1E1E]">
            <p className="font-bold text-center my-0.5 text-sm">Progress</p>

            <div className="flex bg-white w-full h-5 rounded-md">
            <motion.span
                initial={{
                    width: 0,
                }}
                animate={{
                    width: `${goalProgress}%`
                }}
                className={`bg-[#73FFA3] rounded-md h-full`}
            >
                </motion.span>
            </div>
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                    paddingLeft: goalProgress <= 50 ? `${goalProgress - 6}%` : `${goalProgress - 10}%`
                }}
                exit={{
                    paddingLeft: "88%"
                }}
                className="w-[94%] text-[.92rem]"
            >
                <p>{goalProgress}%</p>
            </motion.div>
        </div>
    )
}