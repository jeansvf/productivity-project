import { useState } from "react"
import { useTimerContext } from "../../../contexts/TimerContext"
import ToggleSwitch from "./ToggleSwitch"

export default function AlarmAdvancedSettings() {
    const { customizeAutoStart, customizeLongBreakInterval } = useTimerContext()

    const [isActive, setIsActive] = useState({
        break: JSON.parse(localStorage.getItem("alarm_settings"))?.autoStartBreaks ? JSON.parse(localStorage.getItem("alarm_settings"))?.autoStartBreaks : "false",
        pomodoro: JSON.parse(localStorage.getItem("alarm_settings"))?.autoStartPomodoros ? JSON.parse(localStorage.getItem("alarm_settings"))?.autoStartPomodoros : "false",
    })
    const [longBreakIntervalInputValue, setLongBreakIntervalInputValue] = useState(JSON.parse(localStorage.getItem("alarm_settings"))?.longBreakInterval ? JSON.parse(localStorage.getItem("alarm_settings"))?.longBreakInterval : 4)

    return (
        <div className="flex items-center mt-7 font-medium text-[17px] max-md:flex-col">
            <button
                onClick={() => {
                    let localAutoStartBreaks = JSON.parse(localStorage.getItem("alarm_settings"))?.autoStartBreaks
                    let condition = localAutoStartBreaks == "false" ? "true" : localAutoStartBreaks == "true" ? "false" : localAutoStartBreaks == undefined ? "true" : "false"

                    customizeAutoStart("break", condition)
                    setIsActive({...isActive, break: condition})
                }}
                className="flex items-center"
                type="button"
            >
                <span className="mr-2">Auto Start Breaks</span>
                <ToggleSwitch isToggled={isActive.break} />
            </button>

            <button
                onClick={() => {
                    let localAutoStartPomodoros = JSON.parse(localStorage.getItem("alarm_settings"))?.autoStartPomodoros
                    let condition = localAutoStartPomodoros == "false" ? "true" : localAutoStartPomodoros == "true" ? "false" : localAutoStartPomodoros == undefined ? "true" : "false"

                    customizeAutoStart("pomodoro", condition)
                    setIsActive({...isActive, pomodoro: condition})
                }}
                className="flex items-center mx-5"
                type="button"
            >
                <span className="mr-2 max-md:my-3">Auto Start Pomodoros</span>
                <ToggleSwitch isToggled={isActive.pomodoro} />
            </button>

            <div className="flex items-center">
                <label htmlFor="long-break-interval-input" className="mr-2 cursor-pointer">Long Break Interval</label>
                <input
                    onChange={(e) => {
                        if(e.target.value.length > 1) {
                            return
                        }
                        setLongBreakIntervalInputValue(e.target.value)
                        customizeLongBreakInterval(e.target.value)
                    }}
                    className="w-10 h-8 rounded-lg bg-black bg-opacity-40 text-center text-xl"
                    id="long-break-interval-input"
                    value={longBreakIntervalInputValue}
                >
                </input>
            </div>
        </div>
    )
}