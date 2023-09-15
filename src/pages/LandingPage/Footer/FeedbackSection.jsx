import { motion } from "framer-motion";
import { AiOutlineMail } from "react-icons/ai";

export default function Feedback({ setShowFeedbackForm }) {
    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0}}
                className="flex flex-col absolute text-white mt-8 max-md:static max-md:items-center"
            >
                <p className="text-[1.2rem] font-semibold">Have a suggestion?</p>
                <h3 className="text-3xl font-semibold">Give us feedback!</h3>
                <div onClick={() => setShowFeedbackForm(true)} className="flex items-center justify-center w-72 h-12 mt-3 font-semibold text-xl cursor-pointer border-[1px] border-white bg-[#171717] text-white">
                    <button type="button" className="w-full h-full">Contact</button>
                    <div className="flex items-center justify-center w-16 text-2xl h-full border-l-[1px] border-white bg-[#171717] text-white">
                        <AiOutlineMail />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}