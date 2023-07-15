import { useEffect, useRef, useState } from "react";
import Task from "./Task";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { AnimatePresence, motion } from "framer-motion";
import { BsCheck } from "react-icons/bs";
import LoadingAnimation from "../../components/LoadingAnimation"

export default function Goal({ goals, goal, goalIndex, setGoals, getUserGoals }) {
    const [goalProgress, setGoalProgress] = useState(0)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [showGoalEditModal, setShowGoalEditModal] = useState(false)
    const [completeGoalAnimation, setCompleteGoalAnimation] = useState(false)
    const [isAllTasksDone, setIsAllTasksDone] = useState(false)
    const [isGoalComplete, setIsGoalComplete] = useState(false)
    const [showDateEditing, setShowDateEditing] = useState(false)
    const [goalError, setGoalError] = useState("")
    const [newGoalDate, setNewGoalDate] = useState("")
    
    const writingTimeout = useRef()
    const goalEditModalRef = useRef()
    const optionsButtonRef = useRef()

    useEffect(() => {
        document.addEventListener("click", (event) => {
            if (event.target != goalEditModalRef.current && event.target != optionsButtonRef.current) {
                setShowGoalEditModal(false)
            }
        })
    }, [])
    
    useEffect(() => {
        goal.tasks.length == 0 ? deleteGoal() : null
        if(goals[goalIndex].isGoalComplete == true) {
            setIsGoalComplete(true)
        } else getGoalProgress()
    }, [goal])

    useEffect(() => {
        goalProgress == 100 ? setIsAllTasksDone(true) : setIsAllTasksDone(false)
    }, [goalProgress])

    const getGoalProgress = () => {
        let doneTasks = 0;
        let notDoneTasks = 0;

        goal?.tasks?.map(task => {
            task.isComplete ? doneTasks++ : notDoneTasks++
        })
        
        setGoalProgress(Math.floor((doneTasks / (doneTasks + notDoneTasks)) * 100));
    }

    const deleteGoal = () => {
        setDeleteLoading(true)
        deleteDoc(doc(db, "goals", goal.goalId)).then(() => {
            getUserGoals()
            setDeleteLoading(false)
        })
    }

    const changeGoalTitle = (event) => {
        clearTimeout(writingTimeout.current)
        setGoalError("")

        if(event.target.value == "") {
            setGoalError("Invalid Title")

            let newGoals = structuredClone(goals)
            newGoals[goalIndex].title = event.target.value
            setGoals(newGoals)
            return
        }

        // change goal title from state
        let newGoals = structuredClone(goals)
        newGoals[goalIndex].title = event.target.value
        setGoals(newGoals)

        // after 500ms change goal title from database
        writingTimeout.current = setTimeout(() => {
            setDoc(doc(db, "goals", newGoals[goalIndex].goalId), newGoals[goalIndex])
        }, 600)
    }

    const addNewTask = () => {
        let newGoals = structuredClone(goals)
        newGoals[goalIndex].tasks.push({
            taskContent: "New Task"
        })
        setGoals(newGoals)
        
        setDoc(doc(db, "goals", newGoals[goalIndex].goalId), newGoals[goalIndex])
    }

    const setGoalComplete = () => {
        let newGoals = structuredClone(goals)
        newGoals[goalIndex].isGoalComplete = true
        setIsGoalComplete(true)
        setGoals(newGoals)

        setDoc(doc(db, "goals", newGoals[goalIndex].goalId), newGoals[goalIndex])
    }

    const changeGoalDate = () => {
        setGoalError("")
        
        if (newGoalDate.length > 7 || newGoalDate == "") {
            setGoalError("Invalid date")
            return
        }

        if (newGoalDate.length <= 7) {
            let newGoals = structuredClone(goals)
            newGoals[goalIndex].goalDate = newGoalDate
            setGoals(newGoals)

            setDoc(doc(db, "goals", newGoals[goalIndex].goalId), newGoals[goalIndex])
        }
    }

    return (
        <motion.div
        initial={{
            opacity: "0%"
        }}
        animate={{
            opacity: deleteLoading ? "40%" : "100%"
        }}
        exit={{
            opacity: "0%"
        }} className="flex flex-col relative w-80 h-[19rem] mx-3 my-2 bg-[#2D2D2D] rounded-lg">

            {deleteLoading ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <LoadingAnimation width={8} height={8} />
                </div>
            ) : null}

            <AnimatePresence>
                {showGoalEditModal ? (
                    <motion.div
                    initial={{
                        opacity: 0,
                        y: -10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        y: -10,
                    }}
                    transition={{
                        type: "spring",
                        damping: 50,
                        stiffness: 800
                    }}
                    ref={goalEditModalRef} className="flex flex-col justify-center absolute origin-top-right rounded-lg p-1 top-0 right-0 m-[.4rem] bg-[#171717]">
                        <button onClick={() => deleteGoal()} className="flex items-center text-lg rounded-md mb-1 hover:bg-red-400 hover:text-black">
                            <BiTrashAlt className="w-5 h-5 m-1" />
                            <p className="mr-2">Delete Goal</p>
                        </button>
                        <button onClick={() => setShowDateEditing(true)} className="flex items-center text-lg rounded-md hover:bg-blue-300 hover:text-black">
                            <AiOutlineEdit className="w-5 h-5 m-1" />
                            <p className="mr-2">Edit Date</p>
                        </button>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <div className="w-full justify-between flex items-center px-3">
                <input onChange={(event) => changeGoalTitle(event)} className="font-bold my-[.3rem] bg-transparent" placeholder="Type the goal title..." value={goal.title} />
                <button type="button" ref={optionsButtonRef} onClick={() => setShowGoalEditModal(true)}>
                    <SlOptions className="w-5 h-5 pointer-events-none" />
                </button>
            </div>

            <AnimatePresence>
                {showDateEditing ? (
                    <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    exit={{
                        opacity: 0
                    }}
                    transition={{
                        duration: .2
                    }}
                    className="flex items-center text-slate-300 px-3">
                        <input onChange={(event) => {
                            setGoalError("")
                            setNewGoalDate(event.target.value)
                        }} className="w-[11.3rem] bg-[#1c1c1c] font-bold mt-[.3rem] bg-opacity-70 rounded-md m-0.5 outline-none" type="month" />
                        <button onClick={() => changeGoalDate()} className="flex items-center justify-center w-7 h-7 m-0.5 ml-1 mt-[.3rem] rounded-md bg-blue-300 bg-opacity-0 hover:bg-opacity-100 hover:text-black">
                            <BsCheck className="w-7 h-7" />
                        </button>
                        <button onClick={() => setShowDateEditing(false)} className="flex items-center justify-center w-7 h-7 p-0.5 ml-1 mt-[.3rem] rounded-md bg-red-300 bg-opacity-0 hover:bg-opacity-100 hover:text-black">
                            <IoMdClose className="w-5 h-5" />
                        </button>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <div className="pb-24 px-3">
                {goal?.tasks?.map((task, taskIndex) => (
                    <Task setGoals={setGoals} goals={goals} task={task} goalIndex={goalIndex} taskIndex={taskIndex} setGoalError={setGoalError} key={taskIndex} />
                ))}
            </div>

            <div className="mt-auto absolute bottom-0 w-full bg-[#2D2D2D] rounded-bl-lg rounded-br-lg">
                <AnimatePresence>
                    {!isAllTasksDone && !isGoalComplete && (
                        <div className="absolute overflow-hidden bottom-0 flex flex-col items-center mt-auto w-full h-[6.25rem] rounded-bl-lg rounded-br-lg">    
                            <motion.button exit={{opacity: 0}} onClick={() => addNewTask()} type="button" className="select-none outline-white flex items-center text-sm cursor-pointer mr-auto bg-[#2D2D2D] w-full pl-3 pb-[.3rem] pt-[.15rem]">
                                <IoIosAdd className="opacity-60 w-5 h-5" />
                                <div className="flex items-center">
                                    <p className="opacity-60">Add Task</p>
                                    <p className="absolute right-3 top-0 pt-[.15rem] text-red-500">{goalError}</p>
                                </div>
                            </motion.button>

                            <div className="flex flex-col items-center w-full h-full bg-[#1E1E1E]">
                                <p className="font-semibold text-[.92rem] mt-0.5">Progress</p>
    
                                <div className="flex bg-white w-[94%] h-6 rounded-md">
                                    <motion.span
                                    initial={{
                                        width: 0,
                                    }}
                                    animate={{
                                        width: `${goalProgress}%`
                                    }}
                                    exit={{
                                        width: "100%"
                                    }}
                                    className={`bg-[#73FFA3] rounded-md h-full`}>
                                    </motion.span>
                                </div>
                                
                                <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    paddingLeft: goalProgress <= 50 ? `${goalProgress - 6}%` : `${goalProgress - 10}%`
                                }}
                                exit={{
                                    paddingLeft: "88%"
                                }}
                                className="w-[94%] text-[.92rem]">
                                    <p>{goalProgress}%</p>
                                </motion.div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isAllTasksDone && !isGoalComplete && (
                        <motion.div 
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            delay: .1
                        }}
                        className="flex relative flex-col justify-center items-center mt-auto w-full h-[4.55rem] pt-1 rounded-bl-lg rounded-br-lg text-black bg-[#1E1E1E]">
                            <motion.button
                            onClick={() => {
                                setGoalComplete()
                                setCompleteGoalAnimation(true)
                            }}
                            initial={{
                                opacity: 0,
                                rotateX: 180
                            }}
                            animate={{
                                opacity: 1,
                                rotateX: 360,
                            }}
                            transition={{
                                opacity: 0,
                                duration: .4,
                                delay: .1
                            }}
                            className="flex justify-center items-center bg-[#73FFA3] w-[94%] h-8 font-semibold rounded-md text-center cursor-pointer">Complete</motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {isGoalComplete ? (
                    <div className="flex absolute bottom-0 flex-col justify-center items-center w-full h-[4.55rem] pt-1 rounded-bl-lg rounded-br-lg text-black bg-[#1E1E1E]">
                        <AnimatePresence>
                            {
                                completeGoalAnimation && (
                                    <motion.div
                                    initial={{
                                        y: 0,
                                        scale: .4,
                                    }}
                                    animate={{
                                        y: -40,
                                        scale: 1,
                                    }}
                                    exit={{
                                        y: 0,
                                        scale: .4
                                    }}
                                    >
                                        <BsCheck className="w-10 h-10 bg-[#73FFA3] rounded-full" />
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </div>
                ) : null}
            </div>
        </motion.div>
    )
}