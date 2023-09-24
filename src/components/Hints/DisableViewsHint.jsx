import { IoMdClose } from 'react-icons/io'
import { motion } from 'framer-motion'
import { useHintsContext } from '../../contexts/HintsContext'
import { useEffect } from 'react'

export default function DisableViewsHint() {
    const { showHints, setShowHints } = useHintsContext()

    const disableDisableViewsHint = () => {
        let currentHints = JSON.parse(localStorage.getItem("hints"))? JSON.parse(localStorage.getItem("hints")) : {}
        currentHints.disableViewsHint = false

        localStorage.setItem("hints", JSON.stringify(currentHints))
        setShowHints({ ...showHints, disableViewsHint: false })
    }

    useEffect(() => {
        showHints.disableViewsHint ? (
            setInterval(() => {
                setShowHints({ ...showHints, disableViewsHint: false })
            }, 3300)
        ) : null
    }, [showHints])
    
    return (
        <motion.span
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            exit={{
                opacity: 0
            }}
            transition={{
                delay: .1
            }}
            className="absolute bottom-0 w-max flex my-1 pl-4 pr-3 py-2 bg-[#131313] border border-white rounded-[0.6rem] max-md:left-2 max-md:bottom-2 select-none"
        >
            <motion.div
                initial={{
                    width: 0
                }}
                animate={{
                    width: "100%",
                    transition: {
                        duration: 3,
                        delay: .1,
                        ease: "linear"
                    }
                }}
                className='absolute left-0 bottom-0 w-[30%] h-full bg-[#fff] opacity-10 rounded-[0.55rem]'
            >
            </motion.div>
            <p className="font-inter font-medium opacity-100 z-10">
                <span className='opacity-60'>You can customize which views are visible on your Profile &gt; Settings.</span>
            </p>
            <button onClick={disableDisableViewsHint} className='text-2xl ml-3 hover:opacity-70 z-10' type='button'>
                <IoMdClose />
            </button>
        </motion.span>
    )
}