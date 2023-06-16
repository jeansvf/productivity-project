import { useState } from "react";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import TemporaryTask from "./TemporaryTask";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import LoadingAnimation from "../../components/LoadingAnimation.jsx";
import { motion } from "framer-motion";

export default function temporaryGoal({ getUserGoals, setCreatingTemporaryGoal }) {
    const [isLoading, setIsLoading] = useState()
    const [goalError, setGoalError] = useState("")
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

        // check for invalid input
        switch (true) {
            case (temporaryGoal.title == ""):
                setGoalError("Insert a title");
                return;
            
            case (temporaryGoal.goalDate == undefined):
                setGoalError("Insert a date");
                return;

            case (temporaryGoal.tasks.length == 0):
                setGoalError("Insert at least one task");
                return;

            case (allTasksTextIsFilled == false):
                setGoalError("Add text to all tasks");
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

    const handleMonthInput = (e) => {
        setGoalError("")

        const inputValue = e.target.value

        if (inputValue.length <= 7) {
            setTemporaryGoal({...temporaryGoal, goalDate: inputValue})
        } else {
            setGoalError("Invalid date")
        }
    }

    return (
        <motion.div
        initial={{
            opacity: "0%"
        }}
        animate={{
            opacity: "100%"
        }}
        exit={{
            opacity: "0%"
        }}
        className="flex flex-col w-80 h-[19rem] mx-3 bg-[#2D2D2D] rounded-lg">
            <div className="mx-2">
                <div className="flex items-center justify-between">
                    <input onChange={(event) => {
                        setTemporaryGoal({...temporaryGoal, title: event.target.value})
                    }} autoFocus className="font-bold mt-[.3rem] bg-transparent outline-none" placeholder={"Type the goal title..."} type="text" />
                    
                    <button onClick={() => setCreatingTemporaryGoal(false)} className="flex items-center h-6 mt-[.3rem] text-white opacity-70">
                        <IoMdClose className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex items-center justify-between text-slate-300 mt-2">
                    <p className="select-none">Goal Deadline:</p>
                    <input onChange={(event) => handleMonthInput(event)} className="w-[11.5rem] bg-[#1c1c1c] font-bold mt-[.3rem] bg-opacity-70 rounded-md p-0.5 outline-none" type="month" />
                </div>
            </div>
            
            <div id="goal-tasks-window">
                {temporaryGoal?.tasks?.map((task, taskIndex) => <TemporaryTask temporaryGoal={temporaryGoal} setTemporaryGoal={setTemporaryGoal} task={task} taskIndex={taskIndex} key={taskIndex} />)}
            </div>

            <div className="mt-auto relative w-full">
            
                <div className="flex items-center pb-1 justify-between px-3">
                    <button onClick={() => {
                        setTemporaryGoal({...temporaryGoal, tasks: [...temporaryGoal?.tasks, {
                            taskContent: ""
                        }]})
                        }} type="button" className="flex items-center text-sm opacity-60 cursor-pointer">
                        <IoIosAdd className="w-5 h-5" />
                        <p>Add Task</p>
                    </button>

                    <div className="pr-1.5 text-red-500">{goalError}</div>
                </div>

                <div className="flex flex-col items-center justify-center w-full h-[4.6rem] rounded-bl-lg rounded-br-lg bg-[#1E1E1E]">    
                    <button onClick={() => addGoalToDatabase()} type="button" className="flex bg-white w-[94%] h-9 rounded-md text-black font-semibold items-center justify-center text-lg hover:bg-opacity-80">
                        {isLoading ? (
                            <LoadingAnimation width={5} height={5} />
                        ) : "Create Goal"}
                    </button>
                </div>
            </div>
        </motion.div>
    )
}