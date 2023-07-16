import { motion } from "framer-motion"

export default function Month({ month, completion }) {
    return (
        <div className="flex flex-col items-center justify-end h-full w-9 mx-1">
            <div className="flex items-end w-full h-full">
                <motion.div initial={{height: 0}} animate={{height: completion}} className="max-h-full w-full bg-[#FF7373]"></motion.div>
            </div>
            <p className="block">{month}</p>
        </div>
    )
}