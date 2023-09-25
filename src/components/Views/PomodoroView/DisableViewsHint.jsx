import { IoMdClose } from 'react-icons/io'
import { motion } from 'framer-motion'
import { useHintsContext } from '../../../contexts/HintsContext'


export default function DisableViewsHint() {
    const { showHints, setShowHints } = useHintsContext()

    const disableDisableViewsHint = () => {
        let currentHints = JSON.parse(localStorage.getItem("hints"))? JSON.parse(localStorage.getItem("hints")) : {}
        currentHints.disableViewsHint = "disabled"

        localStorage.setItem("hints", JSON.stringify(currentHints))
        setShowHints({ ...showHints, disableViewsHint: "disabled" })
    }

    return (
        <motion.span
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: .1
                }
            }}
            transition={{
                delay: .1
            }}
            className="flex my-1 pl-4 pr-3 py-2 bg-[#131313] border border-white rounded-[0.6rem] max-md:left-2 max-md:bottom-2 select-none"
        >
            <span className='font-inter font-medium opacity-60 z-10'>You can customize which views are visible on your Profile &gt; Settings.</span>
            <button onClick={disableDisableViewsHint} className='text-2xl ml-3 hover:opacity-70 z-10' type='button'>
                <IoMdClose />
            </button>
        </motion.span>
    )
}