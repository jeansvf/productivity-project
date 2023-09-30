import {motion} from "framer-motion"

export default function ConfigureTimeText({setSliderSettings, sliderSettings}) {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.1}}
            className="flex items-center absolute"
        >
            <p className="text-lg font-medium mr-3.5 whitespace-nowrap">
                Study Time Goal
            </p>
            <button
                onClick={() =>
                    setSliderSettings({...sliderSettings, showSlider: true})
                }
                type="button"
                className="px-3.5 py-1.5 rounded-md text-lg font-medium bg-[#717171] hover:opacity-80"
            >
                Configure
            </button>
        </motion.div>
    )
}
