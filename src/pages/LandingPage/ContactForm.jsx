import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import emailjs from "@emailjs/browser"

export default function ContactForm({ setShowContactForm }) {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")

    const [error, setError] = useState("")

    useEffect(() => console.log(error), [error])

    const templateParams = {
        from_name: name,
        message: message,
        email: email,
    }

    return (
        <motion.form
            initial={{
                y: -300,
            }}
            animate={{
                y: 0,
            }}
            exit={{
                y: -300,
                opacity: 0
            }}
            transition={{
                duration: .2,
                type: "just",
            }}
            onSubmit={(e) => {
                e.preventDefault()
                
                switch (true) {
                    case (name == ""):
                        console.log("Type your name")
                        return;
                    
                    case (email == ""):
                        console.log("Type your e-mail")
                        return;
            
                    case (message == ""):
                        console.log("Type a message")
                        return;
                }
                
                // TODO: add error to the screen
                // TODO: add email submitting to feedback form

                emailjs.send("service_4zreeqm", "template_0j6nzci", templateParams, "_5AFddRUV8pCwaNDs")
                .then(() => setShowContactForm(false))
            }}
            className="left-0 top-6 absolute flex flex-col justify-center self-center ml-12 text-white"
        >
            <div className="flex">
                <div className="flex flex-col mr-2">
                    <label htmlFor="name-input" className="font-semibold text-[1.05rem]">Name</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" id="name-input" className="bg-transparent border-[1px] border-white rounded-sm py-1.5 pl-[1px] outline-none text-[1.1rem]" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email-input" className="font-semibold text-[1.05rem]">E-mail</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="email-input" className="bg-transparent border-[1px] border-white rounded-sm py-1.5 pl-[1px] outline-none text-[1.1rem]" />
                </div>
            </div>
            <div className="flex flex-col mt-0.5">
                <label htmlFor="message-input" className="font-semibold text-[1.05rem]">Message</label>
                <textarea onChange={(e) => setMessage(e.target.value)} id="message-input" className="bg-transparent border-[1px] border-white rounded-sm resize-none h-32 pl-[1px] outline-none text-[1.1rem]" />
            </div>
            <div className="flex justify-end items-center mt-4">
                <p onClick={() => setShowContactForm(false)} className="underline mr-5 cursor-pointer hover:opacity-70">Cancel</p>
                <input type="submit" value="Send" className="bg-white text-black px-10 py-1.5 rounded-sm font-semibold text-lg cursor-pointer border-[1px] hover:bg-transparent hover:text-white hover:border-white" />
            </div>
        </motion.form>
    )
}