import { BsCheck } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

export default function TemporaryTask({ task, taskIndex, setTemporaryGoal, temporaryGoal }) {
    return (
        <div className="w-full flex items-center">
            <BsCheck onClick={() => {
                let newTask = structuredClone(temporaryGoal)
                newTask.tasks[taskIndex] = {...newTask.tasks[taskIndex], isComplete: !newTask.tasks[taskIndex].isComplete}
                setTemporaryGoal(newTask)
                console.log(newTask);
            }} className={`w-7 h-7 m-2 text-black ${task.isComplete ? "bg-[#73FFA3]" : "bg-white"} rounded-full cursor-pointer`} />
            
            <input type="text" onChange={(event) => {
                let newTask = structuredClone(temporaryGoal)
                newTask.tasks[taskIndex] = {
                    taskContent: event.target.value,
                }
                setTemporaryGoal(newTask)
            }} className="bg-transparent w-2/3" placeholder="Type task..." />
            
            <FaTrash onClick={() => {
                let newTask = structuredClone(temporaryGoal)
                newTask.tasks.splice(taskIndex, 1)
                setTemporaryGoal(newTask)
            }} className="flex ml-auto mr-5 w-8 h-8 cursor-pointer p-2 rounded-lg bg-white bg-opacity-0 hover:bg-opacity-20" />
        </div>
    )
}