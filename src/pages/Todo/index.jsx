import { IoIosAdd } from "react-icons/io";

export default function Todo() {
    return (
        <main className="flex text-white pt-[4.5rem] pl-4">
            <div className="flex flex-col items-center w-80 h-fit bg-[#2E2E2E] rounded-[.4rem] mr-5">
                <h2 className="w-[90%] py-4 font-semibold text-[17px]">Todo</h2>
                <div className="flex items-center cursor-pointer bg-[#4F4F4F] w-[92%] h-10 mb-2 rounded-[.25rem]">
                    <div className="w-2 h-full rounded-tl-[.25rem] rounded-bl-[.25rem] bg-[#F478FF]"></div>
                    <p className="pl-1">fix login screen appearance on re...</p>
                </div>
                <div className="flex items-center cursor-pointer bg-[#4F4F4F] w-[92%] h-10 mb-2 rounded-[.25rem]">
                    <div className="w-2 h-full rounded-tl-[.25rem] rounded-bl-[.25rem] bg-[#78D7FF]"></div>
                    <p className="pl-1">add profile picture changing</p>
                </div>
                <div className="flex items-center cursor-pointer bg-[#4F4F4F] w-[92%] h-10 mb-2 rounded-[.25rem]">
                    <div className="w-2 h-full rounded-tl-[.25rem] rounded-bl-[.25rem] bg-[#FFA978]"></div>
                    <p className="pl-1">add forgot password</p>
                </div>
                <div className="flex items-center cursor-pointer bg-[#4F4F4F] w-[92%] h-10 mb-2 rounded-[.25rem]">
                    <div className="w-2 h-full rounded-tl-[.25rem] rounded-bl-[.25rem] bg-[#78FF9E]"></div>
                    <p className="pl-1">add quiz title changing</p>
                </div>
                <div className="flex items-center cursor-pointer bg-[#4F4F4F] w-[92%] h-10 mb-2 rounded-[.25rem]">
                    <div className="w-2 h-full rounded-tl-[.25rem] rounded-bl-[.25rem] bg-[#78D7FF]"></div>
                    <p className="pl-1">add answers score explanation</p>
                </div>
                <button className="flex w-[92%] pt-1 pb-3 items-center"><IoIosAdd className="text-2xl" /> Add Task</button>
            </div>
            
            <div className="flex flex-col items-center w-80 h-fit bg-[#2E2E2E] rounded-[.4rem] mr-5">
                <h2 className="w-[90%] py-4 font-semibold text-[17px]">Doing</h2>
                <div className="flex items-center cursor-pointer bg-[#4F4F4F] w-[92%] h-10 mb-2 rounded-[.25rem]">
                    <div className="w-2 h-full rounded-tl-[.25rem] rounded-bl-[.25rem] bg-[#78FF9E]"></div>
                    <p className="pl-1">add answers color</p>
                </div>
                <div className="flex items-center cursor-pointer bg-[#4F4F4F] w-[92%] h-10 mb-2 rounded-[.25rem]">
                    <div className="w-2 h-full rounded-tl-[.25rem] rounded-bl-[.25rem] bg-[#78D7FF]"></div>
                    <p className="pl-1">add forgot password</p>
                </div>
                <button className="flex w-[92%] pt-1 pb-3 items-center"><IoIosAdd className="text-2xl" /> Add Task</button>
            </div>
            
            <div className="flex flex-col items-center w-80 h-fit bg-[#2E2E2E] rounded-[.4rem] mr-5">
                <h2 className="w-[90%] py-4 font-semibold text-[17px]">Done</h2>
                <div className="flex items-center cursor-pointer bg-[#4F4F4F] w-[92%] h-10 mb-2 rounded-[.25rem]">
                    <div className="w-2 h-full rounded-tl-[.25rem] rounded-bl-[.25rem] bg-[#F478FF]"></div>
                    <p className="pl-1">add answers score</p>
                </div>
                <button className="flex w-[92%] pt-1 pb-3 items-center"><IoIosAdd className="text-2xl" /> Add Task</button>
            </div>

            <div className="flex items-center cursor-pointer pl-4 w-56 h-12 text-lg border-[1px] rounded-[.4rem]">
                <IoIosAdd className="text-[1.75rem] text-start" />
                Add Another List
            </div>
        </main>
    )
}