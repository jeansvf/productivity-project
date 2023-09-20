import { motion } from "framer-motion"
import { IoMdClose } from "react-icons/io"
import { useHintsContext } from "../../contexts/HintsContext"

export default function RadiosMenuHint() {
    const { showHints, setShowHints } = useHintsContext()

    const disableRadiosMenuHint = () => {
        let currentHints = JSON.parse(localStorage.getItem("hints"))?.radiosMenuHint ? JSON.parse(localStorage.getItem("hints"))?.radiosMenuHint : {}
        currentHints.radiosMenuHint = false

        localStorage.setItem("hints", JSON.stringify(currentHints))
        setShowHints({ ...showHints, radiosMenuHint: false })
    }

    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                delay: .3
            }}
            className="flex items-center pl-2.5 pr-1.5 w-[13.5rem] h-[3.5rem] border border-white border-opacity-30 bg-[#111111] bg-opacity-80 rounded-lg"
        >
            <div>
                <p className="leading-5 text-[#FFA928] underline underline-offset-2">New!</p>
                <p className="">Click to change radio</p>
            </div>
            <button onClick={disableRadiosMenuHint} className="ml-auto text-2xl" type="button">
                <IoMdClose />
            </button>
        </motion.div>
    )
}