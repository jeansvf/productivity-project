import { BsCheck } from "react-icons/bs";

export default function TabGoalTask() {
    let task = "banana"

    return (
        <div className="flex items-center text-[.96rem]">
            <div className="ml-2 mr-2 my-[.35rem]">
                <BsCheck className={`w-6 h-6 text-black ${task.isComplete ? "bg-[#73FFA3]" : "bg-white"} rounded-full`} />
            </div>

            <p /* value=task.taskContent */>banana</p>
        </div>
    )
}