export default function MinutesInput({ changeTimerMinutes, selectedTimer, timerInputValue }) {
    return (
        <div className="flex flex-col relative items-center mt-5 mb-4">
            <input onChange={(event) => changeTimerMinutes(event.target.value)} value={selectedTimer == "pomodoro" ? timerInputValue.pomodoroMinutes : selectedTimer == "long_break" ? timerInputValue.longBreakMinutes : selectedTimer == "short_break" ? timerInputValue.shortBreakMinutes : ""}
            type="text" className="flex w-24 text-center bg-black text-6xl bg-opacity-30 rounded-lg px-2" />
            <p>minutes</p>
        </div>
    )
}