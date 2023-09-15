import { AnimatePresence } from "framer-motion";
import ContactSection from "./ContactSection";
import FeedbackSection from "./FeedbackSection";
import FeedbackForm from "./FeedbackForm";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { useState } from "react";
import EmailSentConfirmation from "./EmailSentConfirmation";

export default function Footer({ showFeedbackForm, setShowFeedbackForm }) {
    const [emailSent, setEmailSent] = useState(false)
    
    return (
        <footer className="relative overflow-hidden flex items-start w-full h-80 z-10 bg-[#171717] text-white max-md:flex-col max-md:items-center max-md:h-full max-md:pt-10 max-md:pb-7">
            <ContactSection />
            <div className="flex w-full h-full absolute left-1/2 max-md:static max-md:flex-col">
                <div className="self-center w-[1px] mr-12 h-[88%] bg-white max-md:h-[1px] max-md:w-full max-md:m-0"></div>
                <AnimatePresence>
                    {!showFeedbackForm && !emailSent ? <FeedbackSection setShowFeedbackForm={setShowFeedbackForm} /> : null}
                </AnimatePresence>

                <AnimatePresence>
                    {showFeedbackForm && !emailSent ? <FeedbackForm setEmailSent={setEmailSent} setShowFeedbackForm={setShowFeedbackForm} /> : null}
                </AnimatePresence>

                {emailSent ? <EmailSentConfirmation /> : null}
            </div>

            <div className="flex justify-between w-16 ml-auto mt-6 mr-6 z-0 text-white text-2xl max-md:m-0 max-md:mt-8">
                <a href="https://github.com/jeansvf" target="_blank" rel="noopener noreferrer" className="h-fit">
                    <BsGithub />
                </a>
                <a href="https://www.linkedin.com/in/jean-silva-192319254" target="_blank" rel="noopener noreferrer" className="h-fit">
                    <BsLinkedin />
                </a>
            </div>
    </footer>
    )
}