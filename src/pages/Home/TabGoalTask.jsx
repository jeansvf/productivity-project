import { BsCheck } from "react-icons/bs";

export default function TabGoalTask({ taskContent, isComplete }) {
    return (
        <div className="flex items-center text-[.96rem]">
            <div className="ml-2 mr-2 my-[.32rem]">
                <BsCheck className={`w-6 h-6 text-black ${isComplete ? "bg-[#73FFA3]" : "bg-white"} rounded-full`} />
            </div>

            <p>{taskContent}</p>
        </div>
    )
}