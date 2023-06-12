import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import TemporaryTask from "./TemporaryTask";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { motion } from "framer-motion";

export default function temporaryGoal({ getUserGoals, setCreatingTemporaryGoal }) {
    const [isLoading, setIsLoading] = useState()
    const [temporaryGoal, setTemporaryGoal] = useState({
        title: "",
        tasks: [
            {
                isComplete: false,
                taskContent: ""
            }
        ],
    })

    const addGoalToDatabase = () => {
        let allTasksTextIsFilled;
        temporaryGoal.tasks.map(task => task.taskContent != "" ? allTasksTextIsFilled = true : allTasksTextIsFilled = false)

        switch (true) {
            case (temporaryGoal.title == ""):
                console.log("Insert a title");
                return;
            
            case (temporaryGoal.tasks.length == 0):
                console.log("Insert at least one task");
                return;

            case (allTasksTextIsFilled == false):
                console.log("Add text to all tasks");
                return;
        }

        setIsLoading(true)
        let goalIdRef = doc(collection(db, "goals")).id

        let newGoal = structuredClone(temporaryGoal)
        newGoal.goalOwnerUid = auth.currentUser.uid
        newGoal.isGoalComplete = false
        newGoal.goalId = goalIdRef

        setDoc(doc(db, "goals", goalIdRef), newGoal).then(() => setIsLoading(false)).then(() => {
            getUserGoals()
            setCreatingTemporaryGoal(false)
            setIsLoading(false)
        })
    }

    return (
        <div className="flex flex-col w-80 h-[19rem] mx-3 bg-[#2D2D2D] rounded-lg">
            <div className="flex">
                <input onChange={(event) => {
                    setTemporaryGoal({...temporaryGoal, title: event.target.value})
                }} autoFocus className="w-[60%] font-bold ml-2 mt-[.3rem] bg-transparent outline-none" placeholder={"Type the goal title..."} type="text" />
                <input onChange={(event) => setTemporaryGoal({...temporaryGoal, goalDate: event.target.value})} className="w-[40%] font-bold mr-1 mt-[.3rem] bg-transparent opacity-70" type="date" />
            </div>
            
            <div id="goal-tasks-window">
                {temporaryGoal?.tasks?.map((task, taskIndex) => <TemporaryTask temporaryGoal={temporaryGoal} setTemporaryGoal={setTemporaryGoal} task={task} taskIndex={taskIndex} key={taskIndex} />)}
            </div>

            <div className="mt-auto relative">
                <button onClick={() => {
                    setTemporaryGoal({...temporaryGoal, tasks: [...temporaryGoal?.tasks, {
                        taskContent: ""
                    }]})
                    }} type="button" className="flex items-center text-sm opacity-60 cursor-pointer pl-3 pb-[.6rem] pt-[.12rem]">
                    <IoIosAdd className="w-5 h-5" />
                    <p>Add Task</p>
                </button>

                <div className="flex flex-col items-center justify-center w-full h-[4.6rem] rounded-bl-lg rounded-br-lg bg-[#1E1E1E]">    
                    <button onClick={() => addGoalToDatabase()} type="button" className="flex bg-white w-[94%] h-9 rounded-md text-black font-bold items-center justify-center text-lg hover:bg-opacity-80">
                        {isLoading ? (
                            <div className="inline-block h-5 w-5 animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                            </div>
                        ) : "Create Goal"}
                    </button>
                </div>
            </div>
        </div>
    )
}