import { motion } from "framer-motion"

export default function ToggleSwitch({ isToggled }) {
    
    return (
        <motion.div
            animate={{ backgroundColor: isToggled === "true" || isToggled === true ? "#FF7373" : "#1F1F1F" }}
            transition={{ duration: .3 }}
            className={`flex items-center w-12 h-6 px-0.5 rounded-full`}
        >
            <motion.div
                animate={{ x: isToggled === "true" || isToggled === true ? "120%" : 0 }}
                transition={{ duration: .2 }}
                className="w-5 h-5 bg-[#FFFFFF] rounded-full"
            >
            </motion.div>
        </motion.div>
    )
}