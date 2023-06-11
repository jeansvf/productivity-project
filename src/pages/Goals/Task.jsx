import { doc, setDoc } from "firebase/firestore";
import { BsCheck } from "react-icons/bs";
import { db } from "../../firebase-config";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useRef } from "react";

export default function Task({ task, setGoals, goals, taskIndex, goalIndex }) {
    const [isHovering, setIsHovering] = useState(false)

    const writingTimeout = useRef();

    const markTaskAsDone = async () => {
        // mark task as done from state
        let newGoals = structuredClone(goals)
        newGoals[goalIndex].tasks[taskIndex].isComplete = !newGoals[goalIndex].tasks[taskIndex].isComplete
        setGoals(newGoals)

        // mark task as done from database
        setDoc(doc(db, "goals", newGoals[goalIndex].goalId), newGoals[goalIndex])
    }
    
    const deleteTask = () => {
        // delete task from state
        let newGoals = structuredClone(goals)
        newGoals[goalIndex].tasks.splice(taskIndex, 1)
        setGoals(newGoals)

        // delete task from database
        setDoc(doc(db, "goals", newGoals[goalIndex].goalId), newGoals[goalIndex])
    }

    const editTaskContent = (event) => {
        clearTimeout(writingTimeout.current)
        
        // change task content from state
        let newGoals = structuredClone(goals)
        newGoals[goalIndex].tasks[taskIndex].taskContent = event.target.value
        setGoals(newGoals)

        // after 500ms edit task content
        writingTimeout.current = setTimeout(() => {
            setDoc(doc(db, "goals", newGoals[goalIndex].goalId), newGoals[goalIndex])
        }, 500)
    }

    return (
        <div onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} className="flex items-center">
            <button type="button" onClick={() => markTaskAsDone()}>
                <BsCheck className={`w-7 h-7 m-2 text-black ${task.isComplete ? "bg-[#73FFA3]" : "bg-white"} cursor-pointer rounded-full`} />
            </button>

            <input onChange={(event) => editTaskContent(event)} placeholder="Type task..." className="bg-transparent" type="text" value={task.taskContent} />
            
            {isHovering ? (
                <button type="button">
                    <FaTrash onClick={() => deleteTask()} className="flex ml-auto mr-5 w-8 h-8 cursor-pointer p-2 rounded-lg bg-white bg-opacity-0 hover:bg-opacity-20" />
                </button>
            ) : null}
        </div>
    )
}