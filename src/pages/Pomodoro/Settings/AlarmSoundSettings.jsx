import { AnimatePresence, motion } from "framer-motion"
import { BsCaretUpFill, BsFillCaretDownFill } from "react-icons/bs"
import CloseSettingsButton from "./CloseSettingsButton"
import { useState } from "react"
import arcadeAlarm from "../../../assets/alarms/arcade.wav"
import cartoonAlarm from "../../../assets/alarms/cartoon.wav"
import guitarAlarm from "../../../assets/alarms/guitar.wav"

export default function AlarmSoundSettings({ setPomodoroConfigOpened }) {
    const [showDropDownMenu, setShowDropDownMenu] = useState(false)
    const [rangeInputValue, setRangeInputValue] = useState(JSON.parse(localStorage.getItem("alarm_settings"))?.volume ? JSON.parse(localStorage.getItem("alarm_settings")).volume : .5)
    
    const handleAlarmClick = (selectedAlarm) => {
        setShowDropDownMenu(false)
        
        let alarmVolume = JSON.parse(localStorage.getItem("alarm_settings"))?.volume ? JSON.parse(localStorage.getItem("alarm_settings")).volume : .5
        let alarm;
        
        switch (selectedAlarm) {
            case "cartoon":
                addAlarmSoundToLocalStorage("cartoon")

                // play cartoon audio
                alarm = new Audio(cartoonAlarm)
                alarm.volume = alarmVolume
                alarm.play()
                return;
                
            case "arcade":
                addAlarmSoundToLocalStorage("arcade")

                // play cartoon audio
                alarm = new Audio(arcadeAlarm)
                alarm.volume = alarmVolume
                alarm.play()
                return;
            
            case "guitar":
                addAlarmSoundToLocalStorage("guitar")

                // play cartoon audio
                alarm = new Audio(guitarAlarm)
                alarm.volume = alarmVolume
                alarm.play()
                return;
        }
    }

    const addAlarmSoundToLocalStorage = (alarm) => {
        let newAlarmSettings = JSON.parse(localStorage.getItem("alarm_settings")) ? JSON.parse(localStorage.getItem("alarm_settings")) : {}
        newAlarmSettings.alarmSound = alarm
        localStorage.setItem("alarm_settings", JSON.stringify(newAlarmSettings))
    }

    const addAlarmVolumeToLocalStorage = (event) => {
        let newAlarmSettings = JSON.parse(localStorage.getItem("alarm_settings")) ? JSON.parse(localStorage.getItem("alarm_settings")) : {}
        newAlarmSettings.volume = event.target.value
        localStorage.setItem("alarm_settings", JSON.stringify(newAlarmSettings))
    }
    
    return (
        <div className="flex text-xl">
            <p className="self-center">Alarm Sound:</p>
            <div className="mx-2 flex-col relative">
                <button onClick={() => setShowDropDownMenu(!showDropDownMenu)} className={`flex items-center justify-between py-1 px-2 ${showDropDownMenu ? "rounded-tl-[0.3rem] rounded-tr-[0.3rem]" : "rounded-[0.3rem]"} overflow-hidden text-white bg-[#282828]`} type="button">
                    <p className="capitalize">{JSON.parse(localStorage.getItem("alarm_settings"))?.alarmSound ? JSON.parse(localStorage.getItem("alarm_settings"))?.alarmSound : "Arcade"}</p>
                    {showDropDownMenu ? <BsCaretUpFill className="pl-1" /> : <BsFillCaretDownFill className="pl-1" />}
                </button>

                <AnimatePresence>
                    {showDropDownMenu ? (
                        <motion.div
                        initial={{
                            y: -50,
                            opacity: 0
                        }}
                        animate={{
                            y: 0,
                            opacity: 100
                        }}
                        exit={{
                            y: -20,
                            opacity: 0,
                            transition:{
                                duration: .1
                            }
                        }}
                        className="absolute left-0 w-full"
                        >
                            <button onClick={() => handleAlarmClick("cartoon")} className={`w-full flex items-center py-1 px-2 text-white bg-[#282828] hover:bg-[#444444]`} type="button">
                                Cartoon
                            </button>
                            <button onClick={() => handleAlarmClick("arcade")} className={`w-full flex items-center py-1 px-2 text-white bg-[#282828] hover:bg-[#444444]`} type="button">
                                Arcade
                            </button>
                            <button onClick={() => handleAlarmClick("guitar")} className={`w-full flex items-center py-1 px-2 text-white bg-[#282828] hover:bg-[#444444]`} type="button">
                                Guitar
                            </button>
                            <div className="bg-[#282828] px-1 rounded-bl-[0.3rem] rounded-br-[0.3rem]">
                                <input onChange={(event) => {
                                    addAlarmVolumeToLocalStorage(event)
                                    setRangeInputValue(event.target.value)
                                }}
                                value={rangeInputValue}
                                min="0" max="1" step=".1" type="range"
                                className="range accent-white w-full mt-1" />
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>

            <CloseSettingsButton setPomodoroConfigOpened={setPomodoroConfigOpened} />
        </div>
    )
}