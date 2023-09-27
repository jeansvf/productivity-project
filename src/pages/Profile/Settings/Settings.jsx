import ToggleSwitch from "../../Pomodoro/Settings/ToggleSwitch"
import { useState } from "react"
import { useRef } from "react"
import { useProfileContext } from "../../../contexts/ProfileContext"
import { useHintsContext } from "../../../contexts/HintsContext"
import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import PomodoroHoursSlider from "./PomodoroSlider"
import ConfigureTimeText from "./ConfigureTimeText"

export default function Settings({ xl }) {
    const { userInfo, getUserInfo } = useProfileContext()
    const { views, setViews } = useHintsContext()
    const sliderRef = useRef(null)

    const [sliderSettings, setSliderSettings] = useState({
        hours: 0,
        showSlider: false,
        isLoading: false,

        isPomodoroSwitchOn: JSON.parse(localStorage.getItem("views"))?.hidePomodoroView ? JSON.parse(localStorage.getItem("views")).hidePomodoroView : false ,
        isMusicSwitchOn: JSON.parse(localStorage.getItem("views"))?.hideMusicView ? JSON.parse(localStorage.getItem("views")).hideMusicView : false ,
    })

    useEffect(() => {
        let newElement = document.createElement('div')
        
        newElement.innerText = ""
        newElement.classList = 'absolute -left-1 bottom-6 w-6 h-6'
        newElement.id = 'tooltip'
        newElement.innerText = `${sliderSettings.hours}h`
        
        let oldElement = document.getElementById('tooltip')

        oldElement ? sliderRef.current?.thumb0.removeChild(oldElement) : null
        
        sliderRef.current?.thumb0.appendChild(newElement)
    }, [sliderSettings])

    useEffect(() => {
        let newUserInfo = structuredClone(userInfo)
        setSliderSettings({ ...sliderSettings, hours: newUserInfo.plannedHours })
    }, [userInfo])

    // CONTINUE: create components
    
    return (
        <motion.div
            initial={{
                opacity: 0,
                translateY: "50%",
                translateX: xl ? "40%" : "100%",
            }}
            animate={{
                opacity: 1,
                transition: {
                    delay: .5
                }
            }}
            exit={{
                opacity: 0,
                transition: {
                    delay: 0,
                    duration: .1
                }
            }}
            transition={{
                duration: .1,
            }}
            className="absolute top-0 right-1/2 w-[21rem] h-[23rem] max-xl:top-[38rem] max-sm:top-[44rem]"
            style={{ translateX: xl ? "40%" : "100%" }}
        >
            <div className="pl-16 max-xl:flex max-xl:flex-col max-xl:items-center max-xl:text-center">
                <h3 className="font-bold text-5xl mb-4">Views</h3>
                <button
                    onClick={() => {
                        setSliderSettings({ ...sliderSettings, isPomodoroSwitchOn: !sliderSettings.isPomodoroSwitchOn })
                        setViews({ ...views, hidePomodoroView: !sliderSettings.isPomodoroSwitchOn })
                        let newViews = JSON.parse(localStorage.getItem("views")) ? JSON.parse(localStorage.getItem("views")) : {}
                        newViews.hidePomodoroView = !sliderSettings.isPomodoroSwitchOn
                        localStorage.setItem("views", JSON.stringify(newViews))
                    }}
                    className="flex items-center mb-2 font-medium text-lg"
                    type="button"
                >
                    <span className="mr-2">Hide Pomodoro View</span>
                    <ToggleSwitch isToggled={sliderSettings.isPomodoroSwitchOn} />
                </button>
                <button
                    onClick={() => {
                        setSliderSettings({ ...sliderSettings, isMusicSwitchOn: !sliderSettings.isMusicSwitchOn })
                        setViews({ ...views, hideMusicView: !sliderSettings.isMusicSwitchOn })
                        let newViews = JSON.parse(localStorage.getItem("views")) ? JSON.parse(localStorage.getItem("views")) : {}
                        newViews.hideMusicView = !sliderSettings.isMusicSwitchOn
                        localStorage.setItem("views", JSON.stringify(newViews))
                    }}
                    className="flex items-center font-medium text-lg mb-16"
                    type="button"
                >
                    <span className="mr-2">Hide Music View</span>
                    <ToggleSwitch isToggled={sliderSettings.isMusicSwitchOn} />
                </button>
                
                <h3 className="font-bold text-5xl mb-4">Pomodoro</h3>
                <div className="relative flex flex-col w-full items-center">
                    <AnimatePresence>
                        {!sliderSettings.showSlider ? (
                            <ConfigureTimeText setSliderSettings={setSliderSettings} sliderSettings={sliderSettings} />
                        ) : null}
                    </AnimatePresence>
                    <AnimatePresence>
                        {sliderSettings.showSlider ? (
                            <PomodoroHoursSlider sliderSettings={sliderSettings} setSliderSettings={setSliderSettings} sliderRef={sliderRef}  />
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}