import { IoMdClose } from 'react-icons/io'
import { useTimerContext } from '../../contexts/TimerContext'
import { motion } from 'framer-motion'

export default function NavigationHint() {
    const disableNavigationHint = () => {
        localStorage.setItem("disableNavigationHint", "true")
        setShowNavigationHint(false)
    }

    const { setShowNavigationHint } = useTimerContext()

    return (
        <motion.span
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1
        }}
        transition={{
            delay: 1
        }}
        className="fixed left-6 bottom-6 flex bg-[#131313] border border-white rounded-[0.6rem] pl-4 pr-3 py-2">
            <p className="font-inter font-medium opacity-100">
                Hint: <span className='opacity-60'>You can navigate to other sections without stopping the pomodoro.</span>
            </p>
            <button onClick={() => disableNavigationHint()} className='text-2xl ml-3 hover:opacity-70' type='button'>
                <IoMdClose />
            </button>
        </motion.span>
    )
}