import { motion } from "framer-motion";
import { AiOutlineRight } from "react-icons/ai";

export default function ContactSection({ setShowContactForm }) {
    return (
        <motion.div
            initial={{
                y: -300,
            }}
            animate={{
                y: 0,
            }}
            exit={{
                y: -300,
            }}
            transition={{
                duration: .2,
                type: "just",
            }}
            className="mt-8 ml-12"
        >
            <p className="text-lg font-semibold opacity-70">Website Created by Jeansvf</p>
            <h3 className="text-[2.5rem] leading-[3rem] font-bold">Let's collaborate!<br /> Get in touch.</h3>
            <div onClick={() => setShowContactForm(true)} className="flex items-center justify-center w-72 h-12 mt-6 font-semibold text-xl cursor-pointer bg-white transition-colors hover:bg-[#bfbfbf]">
                <button type="button" className="w-full h-full text-black">Contact</button>
                <div className="flex items-center justify-center w-16 text-2xl h-full border-[1px] border-white bg-[#171717]">
                    <AiOutlineRight />
                </div>
            </div>
        </motion.div>
    )
}