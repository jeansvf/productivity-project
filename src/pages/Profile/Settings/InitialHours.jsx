import { useEffect, useRef, useState } from "react"
import { useProfileContext } from "../../../contexts/ProfileContext"
import { motion } from "framer-motion"
import ReactSlider from "react-slider"

export default function InitialHours() {
    const { userInfo } = useProfileContext()
    const [hours, setHours] = useState(0)
    const sliderRef = useRef()
    
    useEffect(() => {
        let newElement = document.createElement('div')
        
        newElement.innerText = ""
        newElement.classList = 'absolute -left-1 bottom-6 w-6 h-6'
        newElement.id = 'tooltip'
        newElement.innerText = `${hours}h`
        
        let oldElement = document.getElementById('tooltip')

        oldElement ? sliderRef.current.thumb0.removeChild(oldElement) : null
        
        sliderRef.current.thumb0.appendChild(newElement)
    }, [hours])
    
    useEffect(() => {
        let newUserInfo = structuredClone(userInfo)
        setHours(newUserInfo.plannedHours)
    }, [userInfo])
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center items-center flex-col w-full h-screen text-white text-center font-semibold">
            <h1 className="text-5xl flex justify-center items-center flex-col max-sm:text-4xl">Hey! Welcome to&nbsp;<p className="text-[#FF7373]">Focusplace<span className="text-white">.</span>&nbsp;</p></h1>
            <h2 className="text-[2rem] mt-6 mx-10 max-sm:text-2xl">Lets do some initial configuration</h2>
            <div className="flex flex-col items-center mt-[11rem] max-md:mt-[18vw]">
                <p className="text-[1.9rem] mx-10 max-sm:text-2xl">How much time do you plan to study per day?</p>
                <ReactSlider ref={sliderRef} className="settings-slider w-[62rem] max-xl:w-[78vw]" onChange={(value) => setHours(value)} value={hours} min={1} max={12} />
                <p className="opacity-40 mb-5 font-medium">(Values can be changed later)</p>
                <button onClick={() => setNewPlannedHours()} type="button" className="bg-[#FF7373] px-8 py-3 rounded-md text-lg hover:opacity-75">Confirm</button>
            </div>
        </motion.div>
    )
}