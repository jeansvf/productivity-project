import { FcGoogle } from "react-icons/fc"
import { IoIosArrowUp } from "react-icons/io"
import { Link } from "react-router-dom"
import pomodoroImage from "../../assets/images/pomodoro-page.png"
import goalsImage from "../../assets/images/goals-page.png"
import musicImage from "../../assets/images/music-page.png"
import todoImage from "../../assets/images/todo-page.png"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Footer from "./Footer"
import LofiSection from "./LofiSection"
import GoalsSection from "./GoalsSection"
import TodoSection from "./TodoSection"
import MainSection from "./MainSection"

export default function LandingPage() {
    const [showFeedbackForm, setShowFeedbackForm] = useState(false)
    const [showBackToTopButton, setShowBackToTopButton] = useState(false)
    const [isHovering, setIsHovering] = useState({
        email: false,
        google: false,
    })

    useEffect(() => {
        window.addEventListener("scroll", () => {
            window.scrollY > 300 ? setShowBackToTopButton(true) : setShowBackToTopButton(false)
        })
    }, [])

    return (
        <main className="flex flex-col w-full h-full bg-gradient-to-tr from-[#323232] to-[#131313] overflow-x-clip overflow-y-clip">
            <AnimatePresence>
                {showBackToTopButton ? (
                    <motion.span initial={{ y: 70 }} animate={{ y: 0 }} exit={{ y: 90 }} onClick={() => window.scrollTo({ top: 0 , behavior: "smooth"})} className="flex justify-center items-center fixed w-11 h-11 max-w-12 max-h-12 bottom-8 right-8 z-20 cursor-pointer bg-white rounded-full text-black text-4xl">
                        <IoIosArrowUp className="mb-0.5" />
                    </motion.span>
                ) : null}
            </AnimatePresence>

            
            <MainSection pomodoroImage={pomodoroImage} setIsHovering={setIsHovering} isHovering={isHovering} />

            <hr className="w-[80%] mx-auto opacity-20" />
            <LofiSection musicImage={musicImage} />
            <hr className="w-[80%] mx-auto opacity-20" />
            <GoalsSection goalsImage={goalsImage} />
            <hr className="w-[80%] mx-auto opacity-20" />
            <TodoSection todoImage={todoImage} />
            
            <Footer setShowFeedbackForm={setShowFeedbackForm} showFeedbackForm={showFeedbackForm} />
        </main>
    )
}