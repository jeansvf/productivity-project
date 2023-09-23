import { motion } from "framer-motion";
import { useTimerContext } from "../../../contexts/TimerContext";
import { useState } from "react";
import AlarmSoundSettings from "./AlarmSoundSettings";
import MinutesInput from "./MinutesInput";
import AlarmAdvancedSettings from "./AlarmAdvancedSettings";

export default function Settings({ setPomodoroConfigOpened }) {
    const { customizeTimer, pomodoroMinutes, longBreakMinutes, shortBreakMinutes } = useTimerContext()
    
    const [selectedTimer, setSelectedTimer] = useState("pomodoro")
    const [timerInputValue, setTimerInputValue] = useState({
        pomodoroMinutes: pomodoroMinutes,
        longBreakMinutes: longBreakMinutes,
        shortBreakMinutes: shortBreakMinutes,
    })

    const addAlarmMinutesToLocalStorage = (timerType, newTime) => {
        if (newTime == "" || newTime == 0) {
            return
        }

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

    const changeTimerMinutes = (newMinutes) => {
        switch (true) {
            case (selectedTimer == "pomodoro"):
                setTimerInputValue({...timerInputValue, pomodoroMinutes: newMinutes})
                break;
            case (selectedTimer == "long_break"):
                setTimerInputValue({...timerInputValue, longBreakMinutes: newMinutes})
                break;
            case (selectedTimer == "short_break"):
                setTimerInputValue({...timerInputValue, shortBreakMinutes: newMinutes})
                break;
        }

        if (newMinutes < 100 && newMinutes.toString().length < 3) {
            addAlarmMinutesToLocalStorage(selectedTimer, newMinutes)
            customizeTimer(selectedTimer, newMinutes)
        }
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
            className="absolute flex flex-col items-center"
        >
            <div className="flex justify-between w-[24rem] text-xl max-sm:w-[20rem] max-sm:text-base">
                <button onClick={() => setSelectedTimer("pomodoro")} className={`py-1 px-2 rounded-[0.3rem] text-black ${selectedTimer == "pomodoro" ? "bg-[#FF8282]" : "text-white"}`} type="button">Pomodoro</button>
                <button onClick={() => setSelectedTimer("long_break")} className={`py-1 px-2 rounded-[0.3rem] text-black ${selectedTimer == "long_break" ? "bg-[#fff082]" : "text-white"} `} type="button">Long Break</button>
                <button onClick={() => setSelectedTimer("short_break")} className={`py-1 px-2 rounded-[0.3rem] text-black ${selectedTimer == "short_break" ? "bg-[#84FF82]" : "text-white"}`} type="button">Short Break</button>
            </div>
            
            <MinutesInput changeTimerMinutes={changeTimerMinutes} selectedTimer={selectedTimer} timerInputValue={timerInputValue} />

            <AlarmSoundSettings setPomodoroConfigOpened={setPomodoroConfigOpened} />

            <AlarmAdvancedSettings />
        </motion.div>
    )
}