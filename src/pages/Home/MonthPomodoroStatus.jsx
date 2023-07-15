export default function MonthPomodoroStatus() {
    return (
        <div className="w-72 px-3.5 py-3 rounded-md bg-[#2E2E2E] font-bold">
            <div className="flex items-center text-xl">
                <p>May&nbsp;</p>
                <p className="text-[#FF7373]">Pomodoro</p>
            </div>
            <div className="h-10 w-full mt-1.5 mb-1 bg-[#3D3C3C]">
                <div className="h-full w-1/2 bg-[#FF7373]"></div>
            </div>
            <p className="text-[1.1rem]">8 hours</p>
        </div>
    )
}