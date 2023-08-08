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
            <h1 className="text-white mt-32 font-ubuntu text-7xl mx-auto text-center max-sm:text-5xl max-md:text-7xl">
                <div className="flex max-lg:block"><p className="text-[#FF7373]">Focusplace,</p> the platform to </div>study and focus
            </h1>

            <div className="flex mx-auto mt-14 max-md:flex-col max-md:justify-center max-md:font-semibold">
                <motion.div className="rounded-full mr-6 max-sm:mr-0" whileHover={{ y: -2 }}>
                    <Link onMouseOver={() => setIsHovering({ ...isHovering, email: true })} onMouseOut={() => setIsHovering({ ...isHovering, email: false })} to={"/signup"} className="flex items-center justify-center w-[17rem] h-11 text-white bg-[#404040] rounded-full text-lg">Start with email</Link>
                </motion.div>
                <motion.div className="rounded-full max-md:mt-2" whileHover={{ y: -2 }}>
                    <Link onMouseOver={() => setIsHovering({ ...isHovering, google: true })} onMouseOut={() => setIsHovering({ ...isHovering, google: false })} to={"/signup"} className="flex items-center justify-center w-[17rem] h-11 bg-white rounded-full text-lg"><FcGoogle className="w-9 h-9 m-2" /> Start with Google</Link>
                </motion.div>
            </div>

            <AnimatePresence>
                {showBackToTopButton ? (
                    <motion.span initial={{ y: 70 }} animate={{ y: 0 }} exit={{ y: 90 }} onClick={() => window.scrollTo({ top: 0 , behavior: "smooth"})} className="flex justify-center items-center fixed w-11 h-11 max-w-12 max-h-12 bottom-8 right-8 z-20 cursor-pointer bg-white rounded-full text-black text-4xl">
                        <IoIosArrowUp className="mb-0.5" />
                    </motion.span>
                ) : null}
            </AnimatePresence>

            <div className="self-center w-[66.5%] min-h-[44.5rem] rounded-xl mt-28 mb-40 max-md:w-[78%] max-md:mb-0">
                <img src={pomodoroImage} alt="pomodoro-img" className="w-full h-full rounded-xl border border-white" />
            </div>

            <h2 className="mt-20 mb-5 px-8 text-center text-[#FF7373] drop-shadow-red-title text-[3.5rem] text-6xl font-semibold max-md:mt-0">The Pomodoro Technique</h2>

            <div className="flex mb-32 justify-center">
                <p className="text-white w-[50%] leading-6 font-medium text-center text-lg max-md:w-[78%]">The Pomodoro Technique is backed by science and has proven to be a game-changer for countless individuals seeking to enhance their productivity and time management skills. By breaking your work into manageable intervals and incorporating regular breaks, you'll avoid burnout and maintain a higher level of concentration throughout the day.</p>
            </div>

            <div className="relative flex justify-center items-center w-full h-[50rem] mt-28 mb-40 max-md:flex-col">
                <div className="absolute w-full h-full bg-gradient-to-r from-[#19031c] to-[#47004f]"></div>
                <div className="z-10 text-left max-md:text-center max-md:mb-8">
                    <h2 className="text-[#FF71CE] drop-shadow-pink-title text-[3.5rem] text-6xl font-semibold">Lofi Music</h2>
                    <p className="text-white w-80 mt-3 leading-6 font-medium text-lg">Better your focus and mood by listening to calm, lofi music with beautiful vaporwave art.</p>
                </div>
                <img src={musicImage} alt="music-img" className="max-w-[50.9%] max-h-[31rem] border-[1px] border-white rounded-xl z-10 max-md:max-w-[78%]" />
            </div>
        
            <div className="relative flex justify-center items-center w-full h-[50rem] mt-36 mb-40 max-md:flex-col">
                <div className="absolute w-full h-full bg-gradient-to-r from-[#030B03] to-[#0C581D]"></div>
                <img src={goalsImage} alt="goals-img" className="max-w-[50.9%] max-h-[31rem] border-[1px] border-white rounded-xl z-10 max-md:max-w-[78%]" />
                <div className="z-10 text-center ml-8 max-md:text-center max-md:ml-0">
                    <h2 className="text-[#73FFA3] drop-shadow-green-title text-[3.5rem] text-6xl font-semibold max-md:mt-6">Goals</h2>
                    <p className="text-white w-80 mt-3 leading-6 font-medium text-lg">Stay on track and achieve your goals with our goal tracker feature! Easily set and monitor your goals, track progress, and stay motivated.</p>
                </div>
            </div>
            
            <div className="relative flex justify-center items-center w-full h-[50rem] mt-28 mb-40 max-md:flex-col">
                <div className="absolute w-full h-full bg-gradient-to-r from-[#050F10] to-[#0D5059]"></div>
                <div className="z-10 text-left max-md:text-center max-md:mb-8">
                    <h2 className="text-[#71EEFF] drop-shadow-blue-title text-[3.5rem] text-6xl font-semibold">Todo</h2>
                    <p className="text-white w-80 mt-3 pr-6 mr-2 leading-6 font-medium text-lg max-sm:pr-0">You don't have to keep everything in your head. Stay organized, stress-free, and focused on what matters most with our Todo List!</p>
                </div>
                <img src={todoImage} alt="todo-img" className="max-w-[50.9%] max-h-[31rem] border-[1px] border-white rounded-xl z-10 max-md:max-w-[78%]" />
            </div>
            
            <Footer setShowFeedbackForm={setShowFeedbackForm} showFeedbackForm={showFeedbackForm} />
        </main>
    )
}