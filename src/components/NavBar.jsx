import { Link, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { GiArcheryTarget, GiMusicalNotes, GiTomato } from "react-icons/gi";
import { IoMdCheckboxOutline } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import LoadingAnimation from "../components/LoadingAnimation";
import { useEffect, useState } from "react";
import { useProfileContext } from "../contexts/ProfileContext";

export default function NavBar() {
    const [isHovering, setIsHovering] = useState("")
    
    const { profilePic } = useProfileContext()

    const location = useLocation()

    return (
        <nav className="flex z-50 fixed items-center w-full h-[3.05rem] bg-[#2E2E2E] text-white text-lg font-ubuntu pl-[.4rem]">
            <Link to={"/home"} onMouseOver={() => setIsHovering("home")} onMouseOut={() => setIsHovering("")} className={`flex items-center h-10 pt-[.4rem] mr-1 py-1 px-3 ${isHovering == "home" || location.pathname == "/home" ? "text-[#EBFF71]" : null}`} >
                <AnimatePresence>
                    {isHovering == "home" || location.pathname == "/home" ? (
                        <motion.div initial={{width: 0}} animate={{width: 28}} exit={{width: 0}} className=" h-7">
                            <HiHome className="w-full h-full" />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
                <p className="ml-2">Home</p>
            </Link>

            <Link to={"/pomodoro"} onMouseOver={() => setIsHovering("pomodoro")} onMouseOut={() => setIsHovering("")} className={`flex items-center h-10 pt-[.4rem] mr-1 py-1 px-3 ${isHovering == "pomodoro" || location.pathname == "/pomodoro" ? "text-[#FF7373]" : null}`} >
                <AnimatePresence>
                    {isHovering == "pomodoro" || location.pathname == "/pomodoro" ? (
                        <motion.div initial={{width: 0}} animate={{width: 28}} exit={{width: 0}} className=" h-7">
                            <GiTomato className="h-full w-full" />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
                <p className="ml-2">Pomodoro</p>
            </Link>

            <Link to={"/music"} onMouseOver={() => setIsHovering("music")} onMouseOut={() => setIsHovering("")} className={`flex items-center h-10 pt-[.4rem] mr-1 py-1 px-3 ${isHovering == "music" || location.pathname == "/music" ? "text-[#FF71CE]" : null}`} >
                <AnimatePresence>
                    {isHovering == "music" || location.pathname == "/music" ? (
                        <motion.div initial={{width: 0}} animate={{width: 28}} exit={{width: 0}} className=" h-7">
                            <GiMusicalNotes className="h-full w-full" />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
                <p className="ml-2">Music</p>
            </Link>
            
            <Link to={"/todo"} onMouseOver={() => setIsHovering("todo")} onMouseOut={() => setIsHovering("")} className={`flex items-center h-10 pt-[.4rem] mr-1 py-1 px-3 ${isHovering == "todo" || location.pathname == "/todo" ? "text-[#71EEFF]" : null}`} >
                <AnimatePresence>
                    {isHovering == "todo" || location.pathname == "/todo" ? (
                        <motion.div initial={{width: 0}} animate={{width: 28}} exit={{width: 0}} className=" h-7">
                            <IoMdCheckboxOutline className="h-full w-full" />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
                <p className="ml-2">Todo</p>
            </Link>
            
            <Link to={"/goals"} onMouseOver={() => setIsHovering("goals")} onMouseOut={() => setIsHovering("")} className={`flex items-center h-10 pt-[.4rem] mr-1 py-1 px-3 ${isHovering == "goals" || location.pathname == "/goals" ? "text-[#73FFA3]" : null}`} >
                <AnimatePresence>
                    {isHovering == "goals" || location.pathname == "/goals" ? (
                        <motion.div initial={{width: 0}} animate={{width: 28}} exit={{width: 0}} className=" h-7">
                            <GiArcheryTarget className="h-full w-full" />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
                <p className="ml-2">Goals</p>
            </Link>
            
            {profilePic ?
            <motion.div className="absolute right-[.4rem] border-[1px] cursor-pointer rounded-full w-10" initial={{scale: .3}} animate={{scale: 1}} transition={{ease: "backOut", duration: .5}}>
                <Link to={"/profile"}>
                    <img className="w-10 h-10 rounded-full" src={profilePic} alt="" />
                </Link>
            </motion.div> : null }
        </nav>
    )
}