import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { BsCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import { useTimerContext } from "../../contexts/TimerContext";
import { useState } from "react";
import arcadeAlarm from "../../assets/alarms/arcade.wav"
import cartoonAlarm from "../../assets/alarms/cartoon.wav"
import guitarAlarm from "../../assets/alarms/guitar.wav"

export default function Settings({setPomodoroConfigOpened}) {
    const [selectedTimer, setSelectedTimer] = useState("pomodoro")
    const [showDropDownMenu, setShowDropDownMenu] = useState(false)
    const [rangeInputValue, setRangeInputValue] = useState(JSON.parse(localStorage.getItem("alarm_settings"))?.volume ? JSON.parse(localStorage.getItem("alarm_settings")).volume : .5)

    const { customizeTimer, pomodoroMinutes, longBreakMinutes, shortBreakMinutes } = useTimerContext()

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

    const addAlarmMinutesToLocalStorage = (timerType, newTime) => {
        let newAlarmSettings = JSON.parse(localStorage.getItem("alarm_settings")) ? JSON.parse(localStorage.getItem("alarm_settings")) : {}
        
        switch (timerType) {
            case "pomodoro":
                newAlarmSettings.pomodoroMinutes = newTime
                break;
            
            case "long_break":
                newAlarmSettings.longBreakMinutes = newTime
                break;
            
            case "short_break":
                newAlarmSettings.shortBreakMinutes = newTime
                break;
        }

        localStorage.setItem("alarm_settings", JSON.stringify(newAlarmSettings))
        customizeTimer(timerType, newTime)
    }

    return (
        <motion.div
        initial={{
            left: 0,
            opacity: 0
        }}
        animate={{
            left: "auto",
            opacity: 100,
            scale: 1,
            transition:{
                duration: .3,
                type: "spring",
            }
        }}
        exit={{
            right: 0,
            opacity: 0,
            transition:{
                duration: .1
            }
        }}
        className="absolute flex flex-col items-center">
            <div className="flex justify-between w-[24rem] text-xl">
                <button onClick={() => setSelectedTimer("pomodoro")} className={`py-1 px-2 rounded-[0.3rem] text-black ${selectedTimer == "pomodoro" ? "bg-[#FF8282]" : "text-white"}`} type="button">Pomodoro</button>
                <button onClick={() => setSelectedTimer("long_break")} className={`py-1 px-2 rounded-[0.3rem] text-black ${selectedTimer == "long_break" ? "bg-[#fff082]" : "text-white"} `} type="button">Long Break</button>
                <button onClick={() => setSelectedTimer("short_break")} className={`py-1 px-2 rounded-[0.3rem] text-black ${selectedTimer == "short_break" ? "bg-[#84FF82]" : "text-white"}`} type="button">Short Break</button>
            </div>
            <div className="flex flex-col relative items-center mt-5 mb-4">
                <input onChange={(event) => {
                    if (event.target.value < 100 && event.target.value.toString().length < 3) {
                        addAlarmMinutesToLocalStorage(selectedTimer, event.target.value)
                        customizeTimer(selectedTimer, event.target.value)
                    }
                }} value={selectedTimer == "pomodoro" ? pomodoroMinutes : selectedTimer == "long_break" ? longBreakMinutes : selectedTimer == "short_break" ? shortBreakMinutes : ""}
                type="text" className="flex w-24 text-center bg-black text-6xl bg-opacity-30 rounded-lg px-2" />
                <p>minutes</p>
            </div>
            <div className="flex text-xl">
                <p className="self-center">Alarm Sound:</p>
                <div className="mx-2 flex-col relative">
                    <button onClick={() => setShowDropDownMenu(!showDropDownMenu)} className={`flex items-center justify-between py-1 px-2 ${showDropDownMenu ? "rounded-tl-[0.3rem] rounded-tr-[0.3rem]" : "rounded-[0.3rem]"} overflow-hidden text-white bg-black bg-opacity-30`} type="button">
                        <p className="capitalize">{JSON.parse(localStorage.getItem("alarm_settings"))?.alarmSound ? JSON.parse(localStorage.getItem("alarm_settings"))?.alarmSound : "Arcade"}</p>
                        {showDropDownMenu ? <BsCaretUpFill className="pl-1" /> : <BsFillCaretDownFill className="pl-1" />}
                    </button>

                    {/* DROPDOWN MENU */}
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
                            }} className="absolute left-0 w-full">
                                <button onClick={() => handleAlarmClick("cartoon")} className={`w-full flex items-center py-1 px-2 text-white bg-black bg-opacity-30 hover:bg-opacity-10`} type="button">
                                    Cartoon
                                </button>
                                <button onClick={() => handleAlarmClick("arcade")} className={`w-full flex items-center py-1 px-2 text-white bg-black bg-opacity-30 hover:bg-opacity-10`} type="button">
                                    Arcade
                                </button>
                                <button onClick={() => handleAlarmClick("guitar")} className={`w-full flex items-center py-1 px-2 text-white bg-black bg-opacity-30 hover:bg-opacity-10`} type="button">
                                    Guitar
                                </button>
                                <div className="bg-black bg-opacity-30 px-1 rounded-bl-[0.3rem] rounded-br-[0.3rem]">
                                    <input onChange={(event) => {
                                        addAlarmVolumeToLocalStorage(event)
                                        setRangeInputValue(event.target.value)
                                    }} value={rangeInputValue} min="0" max="1" step=".1" type="range" className="range accent-white w-full mt-1" /> 
                                </div>
                            </motion.div> ) : null}
                    </AnimatePresence>
                </div>
                <motion.button
                    initial={{
                        scale: 0,
                    }}
                    animate={{
                        scale: 1,
                    }}
                    transition={{
                        duration: .8,
                        type: "spring"
                    }}
                    onClick={() => setPomodoroConfigOpened(false)} className="text-[2rem] p-[.125rem] rounded-[0.3rem] cursor-pointer hover:bg-opacity-10 hover:bg-white">
                        <IoClose />
                </motion.button>
            </div>
        </motion.div>
    )
}