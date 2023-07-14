import { FcGoogle } from "react-icons/fc"
import { BsGithub, BsLinkedin } from "react-icons/bs"
import { AiOutlineRight } from "react-icons/ai"
import { Link } from "react-router-dom"
import pomodoroImage from "../../assets/images/pomodoro-page.png"
import goalsImage from "../../assets/images/goals-page.png"
import musicImage from "../../assets/images/music-page.png"
import todoImage from "../../assets/images/todo-page.png"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import ContactForm from "./ContactForm"
import FeedbackForm from "./FeedbackForm"
import FeedbackSection from "./FeedbackSection"
import ContactSection from "./ContactSection"

export default function LandingPage() {
    const [showContactForm, setShowContactForm] = useState(false)
    const [showFeedbackForm, setShowFeedbackForm] = useState(false)

    return (
        <main className="flex flex-col w-full h-full bg-gradient-to-tr from-[#323232] to-[#131313] overflow-x-clip overflow-y-clip">
            <h1 className="text-white mt-32 font-ubuntu text-7xl mx-auto text-center">
                <div className="flex"><p className="text-[#FF7373]">Placeholder</p>, the platform to </div>study and focus
            </h1>

            <div className="flex mx-auto mt-14">
                <Link to={"/signup"} className="flex items-center justify-center w-[17rem] h-11 text-white bg-[#404040] rounded-full text-lg mr-6">Start with email</Link>
                <Link to={"/signup"} className="flex items-center justify-center w-[17rem] h-11 bg-white rounded-full text-lg"><FcGoogle className="w-9 h-9 m-2" /> Start with Google</Link>
            </div>
        
            <div className="flex justify-center w-full mt-28 mb-40">
                <img src={pomodoroImage} alt="pomodoro-img" className="w-[72rem] border-[1px] border-white rounded-xl" />
            </div>

            <h2 className="mt-20 mb-5 text-center text-[#FF7373] drop-shadow-red-title text-[3.5rem] text-6xl font-semibold">The Pomodoro Technique</h2>
            
            <div className="flex mb-32 justify-center">
                <p className="text-white w-96 leading-6 font-medium text-center text-lg">Discover the power of the Pomodoro Technique, a proven time management method that maximizes your focus and efficiency.</p>
            </div>
            
            <div className="relative flex justify-center items-center w-full h-[50rem] mt-28 mb-40">
                <div className="absolute bottom-0 w-[115vw] h-[92%] rotate-12 bg-gradient-to-r from-[#19031c] to-[#47004f]"></div>
                <div className="z-10 text-left">
                    <h2 className="text-[#FF71CE] drop-shadow-pink-title text-[3.5rem] text-6xl font-semibold">Lofi Music</h2>
                    <p className="text-white w-80 mt-3 leading-6 font-medium text-lg">Better your focus and mood by listening to calm, lofi music with beautiful vaporwave art.</p>
                </div>
                <img src={musicImage} alt="music-img" className="max-h-[31rem] border-[1px] border-white rounded-xl z-10" />
            </div>
        
            <div className="relative flex justify-center items-center w-full h-[50rem] mt-36 mb-40">
                <div className="absolute bottom-0 w-[115vw] h-full rotate-12 bg-gradient-to-r from-[#030B03] to-[#0C581D]"></div>
                <img src={goalsImage} alt="goals-img" className="max-h-[31rem] border-[1px] border-white rounded-xl z-10" />
                <div className="z-10 text-center ml-8">
                    <h2 className="text-[#73FFA3] drop-shadow-green-title text-[3.5rem] text-6xl font-semibold">Goals</h2>
                    <p className="text-white w-80 mt-3 leading-6 font-medium text-lg">Stay on track and achieve your goals with our powerful goal tracker feature! Easily set and monitor your goals, track progress, and stay motivated.</p>
                </div>
            </div>
            
            <div className="relative flex justify-center items-center w-full h-[50rem] mt-28 mb-40">
                <div className="absolute bottom-0 w-[115vw] h-[92%] rotate-12 bg-gradient-to-r from-[#050F10] to-[#0D5059]"></div>
                <div className="z-10 text-left">
                    <h2 className="text-[#71EEFF] drop-shadow-blue-title text-[3.5rem] text-6xl font-semibold">Todo</h2>
                    <p className="text-white w-80 mt-3 leading-6 font-medium text-lg">Keep track of your goals.</p>
                </div>
                <img src={todoImage} alt="todo-img" className="max-h-[31rem] border-[1px] border-white rounded-xl z-10" />
            </div>
            
            <footer className="relative overflow-hidden flex items-start w-full h-80 z-10 bg-[#171717] text-white">
                    <AnimatePresence>
                        {!showContactForm ? <ContactSection setShowContactForm={setShowContactForm} /> : null}
                    </AnimatePresence>

                    <AnimatePresence>
                        {showContactForm ? <ContactForm setShowContactForm={setShowContactForm} /> : null}
                    </AnimatePresence>

                <div className="flex w-full h-full absolute left-1/2">
                    <div className="self-center w-[1px] mr-12 h-[88%] bg-white"></div>

                    <AnimatePresence>
                        {!showFeedbackForm ? <FeedbackSection setShowFeedbackForm={setShowFeedbackForm} /> : null}
                    </AnimatePresence>

                    <AnimatePresence>
                        {showFeedbackForm ? <FeedbackForm setShowFeedbackForm={setShowFeedbackForm} /> : null}
                    </AnimatePresence>
                </div>

                <div className="flex justify-between w-16 ml-auto mt-6 mr-6 z-0 text-white text-2xl">
                    <a href="https://github.com/jeansvf" target="_blank" rel="noopener noreferrer" className="h-fit">
                        <BsGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/jean-silva-192319254" target="_blank" rel="noopener noreferrer" className="h-fit">
                        <BsLinkedin />
                    </a>
                </div>
            </footer>
        </main>
    )
}