import { BsCheck } from "react-icons/bs"

export default function CompletedTask({ task }) {
    return (
        <div className="flex items-center">
            <button type="button" className="mr-2 my-2">
                <BsCheck className={`w-7 h-7 text-black bg-[#73FFA3] cursor-pointer rounded-full`} />
            </button>
            <p className="bg-transparent">{task.taskContent}</p>
        </div>
    )
}