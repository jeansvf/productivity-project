import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function MainSection({ pomodoroImage, setIsHovering, isHovering }) {
    return (
        <>
            <h1 className="text-white mt-32 font-ubuntu text-7xl mx-auto text-center max-sm:text-5xl max-md:text-7xl">
                <div className="flex max-lg:block"><p className="text-[#FF7373]">Focusplace,</p>&nbsp;the platform for </div>focus and productivity
            </h1>
            <div className="flex mx-auto mt-14 max-md:flex-col max-md:justify-center max-md:font-semibold">
                <motion.div className="rounded-full mr-6 max-sm:mr-0" whileHover={{ y: -2 }}>
                    <Link onMouseOver={() => setIsHovering({ ...isHovering, email: true })} onMouseOut={() => setIsHovering({ ...isHovering, email: false })} to={"/signup"} className="flex items-center justify-center w-[17rem] h-11 text-white bg-[#404040] rounded-full text-lg">Start with email</Link>
                </motion.div>
                <motion.div className="rounded-full max-md:mt-2" whileHover={{ y: -2 }}>
                    <Link onMouseOver={() => setIsHovering({ ...isHovering, google: true })} onMouseOut={() => setIsHovering({ ...isHovering, google: false })} to={"/signup"} className="flex items-center justify-center w-[17rem] h-11 bg-white rounded-full text-lg"><FcGoogle className="w-9 h-9 m-2" /> Start with Google</Link>
                </motion.div>
            </div>

            <div className="self-center w-[66.5%] min-h-[44.5rem] rounded-xl mt-28 mb-40 max-md:w-[78%] max-md:mb-0">
                <img src={pomodoroImage} alt="pomodoro-img" className="w-full h-full rounded-xl border border-white select-none" />
            </div>

            <h2 className="mb-5 px-8 text-center text-[#FF7373] drop-shadow-red-title text-[3.5rem] text-6xl font-semibold max-md:mt-0">The Pomodoro Technique</h2>
            <div className="flex mb-32 justify-center">
                <p className="text-white w-[50%] leading-6 font-medium text-center text-lg max-md:w-[78%]">The Pomodoro Technique is backed by science and has proven to be a game-changer for countless individuals seeking to enhance their productivity and time management skills. By breaking your work into manageable intervals and incorporating regular breaks, you'll avoid burnout and maintain a higher level of concentration throughout the day.</p>
            </div>
        </>
    )
}