import { useEffect, useRef, useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { auth, db } from "../../firebase-config"
import { useNavigate } from "react-router-dom"
import { useProfileContext } from "../../contexts/ProfileContext"
import { motion } from "framer-motion"
import ReactSlider from "react-slider"

export default function Settings() {
    const { userInfo, getUserInfo } = useProfileContext()
    
    const [hours, setHours] = useState()
    const navigate = useNavigate()

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

    const setNewPlannedHours = () => {
        if (hours == undefined || isNaN(hours)) {
            return
        }

        updateDoc(doc(db, `users/${auth.currentUser.uid}`), {
            plannedHours: hours
        })
        .then(() => {
            getUserInfo()
            navigate('/profile')
        })
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white text-center font-semibold pt-40">
            <h1 className="text-5xl flex justify-center items-center">Hey! Welcome to&nbsp;<p className="text-[#FF7373]">Placeholder</p>.</h1>
            <h2 className="text-[2rem] mt-6">Lets do some initial configuration</h2>
            <div className="flex flex-col items-center mt-44">
                <p className="text-[1.9rem]">How much time do you plan to study per day?</p>
                <ReactSlider ref={sliderRef} className="settings-slider" onChange={(value) => setHours(value)} value={hours} min={1} max={12} />
                {/* <input onChange={(event) => setHours(event.target.value)} className="w-1/2 h-10 mt-14 mb-2" type="range" value={hours} min={1} max={12} /> */}
                <p className="opacity-40 mb-5 font-medium">(Values can be changed later)</p>
                <button onClick={() => setNewPlannedHours()} type="button" className="bg-[#FF7373] px-8 py-3 rounded-md text-lg hover:opacity-75">Confirm</button>
            </div>
        </motion.div>
    )
}