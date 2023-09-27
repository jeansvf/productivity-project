import { doc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import ReactSlider from "react-slider";
import { auth, db } from "../../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingAnimation from "../../../components/LoadingAnimation";
import { useProfileContext } from "../../../contexts/ProfileContext";

export default function PomodoroHoursSlider({ sliderRef, sliderSettings, setSliderSettings }) {
    const [user] = useAuthState(auth)
    const { userInfo, getUserInfo } = useProfileContext()
    
    const setNewPlannedHours = (hours) => {
        setSliderSettings({ ...sliderSettings, isLoading: true })

        if (hours == undefined || hours == userInfo.plannedHours || isNaN(hours)) {
            setSliderSettings({ ...sliderSettings, isLoading: false, showSlider: false })
            return
        }

        updateDoc(doc(db, `users/${user.uid}`), {
            plannedHours: hours
        })
        .then(() => {
            getUserInfo()
            setSliderSettings({ ...sliderSettings, isLoading: false, showSlider: false })
        })
        .catch(() => {
            setSliderSettings({ ...sliderSettings, isLoading: false, showSlider: false })
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .1 }}
            className="flex flex-col w-full max-xl:items-center"
        >
            <p className="text-lg font-medium">How much time do you plan to study per day?</p>
            <ReactSlider ref={sliderRef} className="settings-slider w-[30rem] mt-8 max-sm:w-full" onChange={(value) => setSliderSettings({ ...sliderSettings, hours: value })} value={sliderSettings.hours} min={1} max={12} />
            <div className="flex items-center max-xl:mb-10">
                <button onClick={() => setNewPlannedHours(sliderSettings.hours)} type="button" className="w-24 h-10 rounded-md text-lg font-medium bg-[#FF7373] hover:opacity-80">{sliderSettings.isLoading ? <LoadingAnimation width={5} height={5} /> : "Confirm"}</button>
                <button onClick={() => setSliderSettings({ ...sliderSettings, showSlider: false })} className="underline opacity-80 mx-4" type="button">Cancel</button>
            </div>
        </motion.div>
    )
}