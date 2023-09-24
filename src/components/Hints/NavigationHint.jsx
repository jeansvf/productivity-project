import { IoMdClose } from 'react-icons/io'
import { motion } from 'framer-motion'
import { useHintsContext } from '../../contexts/HintsContext'

export default function NavigationHint() {
    const { showHints, setShowHints } = useHintsContext()

    const disableNavigationHint = () => {
        let currentHints = JSON.parse(localStorage.getItem("hints"))? JSON.parse(localStorage.getItem("hints")) : {}
        currentHints.navigationHint = false

        localStorage.setItem("hints", JSON.stringify(currentHints))
        setShowHints({ ...showHints, navigationHint: false })
    }

    return (
        <motion.span
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                delay: .3
            }}
            className="flex bg-[#131313] border border-white rounded-[0.6rem] mr-2 pl-4 pr-3 py-2 max-md:left-2 max-md:bottom-2 select-none"
        >
            <p className="font-inter font-medium opacity-100">
                Hint: <span className='opacity-60'>You can navigate to other sections without stopping the pomodoro.</span>
            </p>
            <button onClick={disableNavigationHint} className='text-2xl ml-3 hover:opacity-70' type='button'>
                <IoMdClose />
            </button>
        </motion.span>
    )
}