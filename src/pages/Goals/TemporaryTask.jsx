import { BsCheck } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

export default function TemporaryTask({ task, index, setTemporaryGoal, temporaryGoal }) {
    return (
        <div className="flex items-center">
            <BsCheck onClick={() => {
                let newTask = structuredClone(temporaryGoal)
                newTask.tasks[index] = {...newTask.tasks[index], isComplete: !newTask.tasks[index].isComplete}
                setTemporaryGoal(newTask)
                console.log(newTask);
            }} className={`w-7 h-7 m-2 text-black ${task.isComplete ? "bg-[#73FFA3]" : "bg-white"} rounded-full cursor-pointer`} />
            <input type="text" onChange={(event) => {
                let newTask = structuredClone(temporaryGoal)
                newTask.tasks[index] = {
                    taskContent: event.target.value,
                }
                setTemporaryGoal(newTask)
            }} className="bg-transparent" placeholder="Type a task" />
            <FaTrash onClick={() => {
                let newTask = structuredClone(temporaryGoal)
                newTask.tasks.splice(index, 1)
                setTemporaryGoal(newTask)
            }} className="flex ml-4 w-4 h-4 cursor-pointer" />
        </div>
    )
}