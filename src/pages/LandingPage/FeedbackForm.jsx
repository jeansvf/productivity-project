import emailjs from "@emailjs/browser"
import { motion } from "framer-motion"
import LoadingAnimation from "../../components/LoadingAnimation"
import { useEffect, useState } from "react"

export default function ContactForm({ setShowFeedbackForm, setEmailSent }) {
    const [contactInfo, setContactInfo] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [error, setError] = useState("")
    const [isEmailSending, setIsEmailSending] = useState(false)

    const templateParams = {
        from_name: contactInfo.name,
        message: contactInfo.message,
        email: contactInfo.email,
    }

    useEffect(() => {
        setError("")
    }, [contactInfo])

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
                setIsEmailSending(true)

                switch (true) {
                    case (contactInfo.name == ""):
                        setError("Type your name")
                        setIsEmailSending(false)
                        return
                    
                    case (contactInfo.email == ""):
                        setError("Type your e-mail")
                        setIsEmailSending(false)
                        return
            
                    case (contactInfo.message == ""):
                        setError("Type a message")
                        setIsEmailSending(false)
                        return
                }

                emailjs.send("service_4zreeqm", "template_0j6nzci", templateParams, "_5AFddRUV8pCwaNDs")
                
                .then(() => {
                    setIsEmailSending(false)
                    setEmailSent(true)
                })
                .catch(() => setError("Something went wrong, try again later"))
            }}
            className="flex flex-col justify-center self-center text-white"
        >
            <div className="flex">
                <div className="flex flex-col mr-2">
                    <label htmlFor="name-input" className="font-semibold text-[1.05rem]">Name</label>
                    <input type="text" id="name-input" onChange={(event) => setContactInfo({ ...contactInfo, name: event.target.value })} className="bg-transparent border-[1px] border-white rounded-sm py-1.5 pl-1 outline-none text-[1.1rem]" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email-input" className="font-semibold text-[1.05rem]">E-mail</label>
                    <input type="email" id="email-input" onChange={(event) => setContactInfo({ ...contactInfo, email: event.target.value })} className="bg-transparent border-[1px] border-white rounded-sm py-1.5 pl-1 outline-none text-[1.1rem]" />
                </div>
            </div>
            <div className="flex flex-col mt-0.5">
                <label htmlFor="message-input" className="font-semibold text-[1.05rem]">Message</label>
                <textarea id="message-input" onChange={(event) => setContactInfo({ ...contactInfo, message: event.target.value })} className="bg-transparent border-[1px] border-white rounded-sm resize-none h-32 pl-1 outline-none text-[1.1rem]" />
            </div>
            <div className="flex justify-end items-center mt-4">
                <p className="mr-auto ml-2 text-red-400">{error}</p>
                <p onClick={() => setShowFeedbackForm(false)} className="underline mr-5 cursor-pointer hover:opacity-70">Cancel</p>
                <div className="relative w-32 h-10 font-semibold text-lg cursor-pointer border-[1px] hover:bg-transparent text-black hover:text-white hover:border-white rounded-sm bg-white">
                    <input type="submit" value={!isEmailSending ? "Send" : ""} className="w-full h-full rounded-sm cursor-pointer" />
                    {isEmailSending ? (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <LoadingAnimation width={5} height={5} />
                    </div>
                    ) : null}
                </div>
            </div>
        </motion.form>
    )
}