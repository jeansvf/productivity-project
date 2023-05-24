import { useTimerContext } from "../../contexts/TimerContext"

export default function PomodoroTimer() {
    const { breakInfo, minutes, seconds, isPaused, startTimer, pauseTimer, goToPomodoro, goToBreak } = useTimerContext()

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between w-[24rem] text-xl">
                <button onClick={() => goToPomodoro(true)} className={`py-1 px-2 rounded-[0.3rem] text-black ${breakInfo.timerType == "pomodoro" ? "bg-[#FF8282]" : "text-white"}`} type="button">Pomodoro</button>
                <button onClick={() => goToBreak("long_break")} className={`py-1 px-2 rounded-[0.3rem] text-black ${breakInfo.timerType == "long_break" ? "bg-[#fff082]" : "text-white"}`} type="button">Long Break</button>
                <button onClick={() => goToBreak("short_break")} className={`py-1 px-2 rounded-[0.3rem] text-black ${breakInfo.timerType == "short_break" ? "bg-[#84FF82]" : "text-white"}`} type="button">Short Break</button>
            </div>
            <p className="text-[9.5rem]">{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</p>
            {isPaused ? (
                <div onClick={() => startTimer()} tabIndex="-1" className={`py-[.4rem] cursor-pointer outline-none px-8 rounded-md text-2xl text-black font-normal hover:opacity-80 ${breakInfo.timerType == "pomodoro" ? "bg-[#FF7373]" : breakInfo.timerType == "short_break" ? "bg-[#8CFB8A]" : "bg-[#fff082]"}`}>start</div>
                ) : (
                <div onClick={() => pauseTimer()} tabIndex="-1" className={`py-[.4rem] cursor-pointer outline-none px-8 rounded-md text-2xl text-black font-normal hover:opacity-80 ${breakInfo.timerType == "pomodoro" ? "bg-[#FF7373]" : breakInfo.timerType == "short_break" ? "bg-[#8CFB8A]" : "bg-[#fff082]"}`}>pause</div>
            )}
        </div>
    )
}