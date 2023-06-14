import { useEffect, useRef, useState } from "react";
import Task from "./Task";
import { IoIosAdd } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { AnimatePresence, motion, stagger } from "framer-motion";

export default function Goal({ goals, goal, goalIndex, setGoals, getUserGoals }) {
    
    const [goalProgress, setGoalProgress] = useState(0)
    const [showGoalEditModal, setShowGoalEditModal] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    
    const writingTimeout = useRef()
    const goalEditModalRef = useRef()
    const optionsButtonRef = useRef()
    
    useEffect(() => {
        getGoalProgress()
    }, [goal])

    useEffect(() => {
        goalProgress == 100 ? setIsComplete(true) : setIsComplete(false)
    }, [goalProgress])

    const deleteGoal = () => {;
        deleteDoc(doc(db, "goals", goal.goalId))
        getUserGoals()
    }

    const getGoalProgress = () => {
        let doneTasks = 0;
        let notDoneTasks = 0;

        goal?.tasks?.map(task => {
            task.isComplete ? doneTasks++ : notDoneTasks++
        })
        
        setGoalProgress(Math.floor((doneTasks / (doneTasks + notDoneTasks)) * 100));
    }

    const changeGoalTitle = (event) => {
        clearTimeout(writingTimeout.current)

        // change goal title from state
        let newGoals = structuredClone(goals)
        newGoals[goalIndex].title = event.target.value
        setGoals(newGoals)

        // after 500ms change goal title from database
        writingTimeout.current = setTimeout(() => {
            setDoc(doc(db, "goals", newGoals[goalIndex].goalId), newGoals[goalIndex])
        }, 500)
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
        setGoals(newGoals)

        setDoc(doc(db, "goals", newGoals[goalIndex].goalId), newGoals[goalIndex])
    }

    return (
        <div onClick={(event) => event.target != goalEditModalRef.current && event.target != optionsButtonRef.current ? setShowGoalEditModal(false) : null} className="flex flex-col relative w-80 h-[19rem] mx-3 bg-[#2D2D2D] rounded-lg">
            
            <AnimatePresence>
                {showGoalEditModal ? (
                    <motion.div
                    initial={{
                        scale: 0,
                    }}
                    animate={{
                        scale: 1,
                    }}
                    exit={{
                        scale: 0,
                    }}
                    transition={{
                        type: "spring",
                        damping: 50,
                        stiffness: 600
                    }}
                    ref={goalEditModalRef} className="flex flex-col justify-center absolute origin-top-right rounded-lg p-1 top-0 right-0 m-[.4rem] bg-[#171717]">
                        <button onClick={() => deleteGoal()} className="flex items-center text-lg rounded-md mb-1 hover:bg-red-400 hover:text-black">
                            <BiTrashAlt className="w-5 h-5 m-1" />
                            <p className="mr-2">Delete Goal</p>
                        </button>
                        <button className="flex items-center text-lg rounded-md hover:bg-blue-300 hover:text-black">
                            <AiOutlineEdit className="w-5 h-5 m-1" />
                            <p className="mr-2">Edit Date</p>
                        </button>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <div className="w-full justify-between flex items-center px-3">
                <input onChange={(event) => changeGoalTitle(event)} className="font-bold my-[.3rem] bg-transparent" placeholder="Type the goal title..." value={goal.title} />
                <button ref={optionsButtonRef} onClick={() => setShowGoalEditModal(true)}>
                    <SlOptions className="w-5 h-5 pointer-events-none" />
                </button>
            </div>

            <div id="goal-tasks-window" className="pb-24 px-3">
                {goal?.tasks?.map((task, taskIndex) => (
                    <Task setGoals={setGoals} goals={goals} task={task} goalIndex={goalIndex} taskIndex={taskIndex} key={taskIndex} />
                ))}
            </div>

            <div className="mt-auto absolute bottom-0 w-full bg-[#2D2D2D] rounded-bl-lg rounded-br-lg">
                <AnimatePresence>
                    {!isComplete && (
                        <div className="absolute overflow-hidden bottom-0 flex flex-col items-center mt-auto w-full h-[6.25rem] rounded-bl-lg rounded-br-lg">    
                            <motion.button exit={{opacity: 0}} onClick={() => addNewTask()} type="button" className="select-none flex items-center text-sm cursor-pointer mr-auto bg-[#2D2D2D] w-full pl-3 pb-[.3rem] pt-[.15rem]">
                                <IoIosAdd className="opacity-60 w-5 h-5" />
                                <p className="opacity-60">Add Task</p>
                            </motion.button>

                            <div className="flex flex-col items-center w-full h-full bg-[#1E1E1E]">
                                <p className="font-semibold text-[.92rem] mt-0.5">Progress</p>
    
                                <div className="flex bg-white w-[94%]  h-6 rounded-md">
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
                    {isComplete && (
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
                        className="flex rel ative flex-col justify-center items-center mt-auto w-full h-[4.55rem] pt-1 rounded-bl-lg rounded-br-lg text-black bg-[#1E1E1E]">
                            <motion.button
                            onClick={() => setGoalComplete()}
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
                            className="flex justify-center items-center bg-[#73FFA3] w-[94%] h-8 rounded-md text-center cursor-pointer">Complete</motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
                
            </div>
        </div>
    )
}