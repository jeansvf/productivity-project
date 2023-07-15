export default function YesterdayPomodoroStatus() {
    return (
        <div className="flex w-72 h-44 px-3.5 py-3 mt-5 rounded-md bg-[#2E2E2E] font-bold">
            <div>
                <p className="flex text-xl">Yesterday's</p>
                <p className="text-[#FF7373] text-xl">Pomodoro</p>
            </div>
            <div className="flex ml-auto">
                <p className="self-end leading-3 min-h-[10%] h-[75%] mr-2 text-[1.1rem]">3 hours</p>
                <div className="flex w-11 h-full mb-1 bg-[#3D3C3C]">
                    <div className="self-end w-full h-[75%] bg-[#FF7373]"></div>
                </div>
            </div>
        </div>
    )
}