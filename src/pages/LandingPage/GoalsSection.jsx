import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function GoalsSection({ goalsImage }) {
    const imgRef = useRef(null)
    const isImgInView = useInView(imgRef, { once: true })

    return (
        <div className="relative flex justify-center items-center w-full h-[50rem] max-md:flex-col max-sm:h-[36rem] max-md:h-[40rem]">
            <div className="absolute w-full h-full"></div>
            <motion.img
                animate={{
                    opacity: isImgInView ? 1 : 0,
                    y: isImgInView ? 0 : 20,
                }}
                transition={{
                    ease: "easeInOut",
                    duration: 0.6,
                }}
                ref={imgRef}
                src={goalsImage}
                alt="goals-img"
                className="max-w-[50.9%] max-h-[31rem] border-[1px] border-white rounded-xl z-10 max-md:max-w-[78%]"
            />
            <div className="z-10 text-center ml-8 max-md:text-center max-md:ml-0">
                <h2 className="text-[#73FFA3] drop-shadow-green-title text-[3.5rem] text-6xl font-semibold max-md:mt-6">
                    Goals
                </h2>
                <p className="text-white w-80 mt-3 leading-6 font-medium text-lg">
                    Stay on track and achieve your goals with our goal tracker
                    feature! Easily set and monitor your goals, track progress,
                    and stay motivated.
                </p>
            </div>
        </div>
    )
}
