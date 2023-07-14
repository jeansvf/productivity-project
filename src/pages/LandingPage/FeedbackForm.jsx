import { motion } from "framer-motion"

export default function ContactForm({ setShowFeedbackForm }) {
    return (
        <motion.form
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                duration: .3
            }}
            onSubmit={(e) => {
                e.preventDefault()
            }}
            className="flex flex-col justify-center self-center text-white"
        >
            <div className="flex">
                <div className="flex flex-col mr-2">
                    <label htmlFor="name-input" className="font-semibold text-[1.05rem]">Name</label>
                    <input type="text" id="name-input" className="bg-transparent border-[1px] border-white rounded-sm py-1.5 pl-[1px] outline-none text-[1.1rem]" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email-input" className="font-semibold text-[1.05rem]">E-mail</label>
                    <input type="email" id="email-input" className="bg-transparent border-[1px] border-white rounded-sm py-1.5 pl-[1px] outline-none text-[1.1rem]" />
                </div>
            </div>
            <div className="flex flex-col mt-0.5">
                <label htmlFor="message-input" className="font-semibold text-[1.05rem]">Message</label>
                <textarea id="message-input" className="bg-transparent border-[1px] border-white rounded-sm resize-none h-32 pl-[1px] outline-none text-[1.1rem]" />
            </div>
            <div className="flex justify-end items-center mt-4">
            <p onClick={() => setShowFeedbackForm(false)} className="underline mr-5 cursor-pointer hover:opacity-70">Cancel</p>
                <input type="submit" value="Send" className="bg-white text-black px-10 py-1.5 rounded-sm font-semibold text-lg cursor-pointer border-[1px] hover:bg-transparent hover:text-white hover:border-white" />
            </div>
        </motion.form>
    )
}