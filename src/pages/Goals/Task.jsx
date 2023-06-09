import { BsCheck } from "react-icons/bs";

export default function Task({ task }) {
    return (
        <div className="flex items-center">
            <BsCheck className={`w-7 h-7 m-2 text-black ${task.isComplete ? "bg-[#73FFA3]" : "bg-white"} rounded-full`} />
            <p>{task.taskContent}</p>
        </div>
    )
}