import { useEffect, useRef } from "react"
import { useTimerContext } from "../../contexts/TimerContext"

export default function Pomodoro() {
    
    const { breakInfo, minutes, seconds, isPaused, startTimer, pauseTimer } = useTimerContext()

    return (
        <main className="flex items-center justify-center w-full h-screen text-white font-rubik font-medium">
            <div className="flex flex-col items-center">
                <div className="flex justify-between w-[24rem] text-xl">
                    <button className={`py-1 px-2 rounded-[0.3rem] text-black ${breakInfo.timerType == "pomodoro" ? "bg-[#FF8282]" : "text-white"}`} type="button">Pomodoro</button>
                    <button className={`py-1 px-2 rounded-[0.3rem] text-black ${breakInfo.timerType == "long_break" ? "bg-[#84FF82]" : "text-white"}`} type="button">Long Break</button>
                    <button className={`py-1 px-2 rounded-[0.3rem] text-black ${breakInfo.timerType == "short_break" ? "bg-[#84FF82]" : "text-white"}`} type="button">Short Break</button>
                </div>
                <p className="text-[9.5rem]">{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</p>
                {isPaused ? (
                    <div onClick={() => startTimer()} tabIndex="-1" className={`py-[.4rem] cursor-pointer outline-none px-8 rounded-md text-2xl text-black font-normal hover:opacity-80 ${breakInfo.timerType == "pomodoro" ? "bg-[#FF7373]" : "bg-[#8CFB8A]"}`}>start</div>
                    ) : (
                    <div onClick={() => pauseTimer()} tabIndex="-1" className={`py-[.4rem] cursor-pointer outline-none px-8 rounded-md text-2xl text-black font-normal hover:opacity-80 ${breakInfo.timerType == "pomodoro" ? "bg-[#FF7373]" : "bg-[#8CFB8A]"}`}>pause</div>
                )}
            </div>
        </main>
    )
}