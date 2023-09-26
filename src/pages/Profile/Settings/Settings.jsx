import ReactSlider from "react-slider"
import ToggleSwitch from "../../Pomodoro/Settings/ToggleSwitch"
import { useState } from "react"
import { useRef } from "react"
import { useProfileContext } from "../../../contexts/ProfileContext"
import { useHintsContext } from "../../../contexts/HintsContext"
import { useEffect } from "react"

export default function Settings() {
    const { userInfo, setNewPlannedHours } = useProfileContext()
    const { views, setViews } = useHintsContext()
    const sliderRef = useRef(null)

    const [sliderSettings, setSliderSettings] = useState({
        hours: 0,
        showSlider: false,

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

    return (
        <div className="w-full h-[23rem] mx-auto">
            <div className="pl-16">
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

                {!sliderSettings.showSlider ? (
                    <div className="flex items-center">
                        <p className="text-lg font-medium mr-3.5">Study Time Goal</p>
                        <button onClick={() => setSliderSettings({ ...sliderSettings, showSlider: true })} type="button" className="px-3.5 py-1.5 rounded-md text-lg font-medium bg-[#717171] hover:opacity-80">Configure</button>
                    </div>
                ) : null}

                {/* TODO: add animation when opening slider */}

                {sliderSettings.showSlider ? (
                    <>
                        <p className="text-lg font-medium">How much time do you plan to study per day?</p>
                        <ReactSlider ref={sliderRef} className="settings-slider w-[30rem] mt-8" onChange={(value) => setSliderSettings({ ...sliderSettings, hours: value })} value={sliderSettings.hours} min={1} max={12} />
                        <button onClick={() => setNewPlannedHours(sliderSettings.hours)} type="button" className="px-4 py-1.5 rounded-md text-lg font-medium bg-[#FF7373] hover:opacity-80">Confirm</button>
                        {/* TODO: make a loading when clicking confirm button and close it after */}
                        <button onClick={() => setSliderSettings({ ...sliderSettings, showSlider: false })} className="underline opacity-80 ml-3" type="button">Cancel</button>
                    </>
                ) : null}
            </div>
        </div>
    )
}