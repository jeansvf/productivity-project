import { useEffect, useState } from "react";
import Task from "./Task";
import { IoIosAdd } from "react-icons/io";

export default function Goal({ goal }) {
    useEffect(() => {
        getGoalProgress()
    }, [])
    
    const [goalProgress, setGoalProgress] = useState()
    
    const getGoalProgress = () => {
        let doneTasks = 0;
        let notDoneTasks = 0;

        goal?.tasks?.map(task => {
            task.isComplete ? doneTasks++ : notDoneTasks++
        })
        
        setGoalProgress(Math.floor((doneTasks / (doneTasks + notDoneTasks)) * 100));
    }

    return (
        <div className="flex flex-col w-80 h-[19rem] mx-3 bg-[#2D2D2D] rounded-lg">
            <p className="font-bold pl-2 pt-[.3rem]">{goal.title}</p>

            <div id="goal-tasks-window">
                {goal?.tasks?.map((task, index) => (
                    <Task task={task} key={index} />
                ))}
            </div>

            <div className="mt-auto">
                <button type="button" className="flex items-center text-sm opacity-60 cursor-pointer pl-3 pb-[.6rem] pt-[.12rem]">
                    <IoIosAdd className="w-5 h-5" />
                    <p>Add Task</p>
                </button>

                <div className="flex relative flex-col items-center mt-auto w-full h-[4.6rem] pt-1 rounded-bl-lg rounded-br-lg bg-[#1E1E1E]">    
                    <p className="font-semibold text-[.92rem]">Progress</p>
                    <div className="flex bg-white w-[94%] h-6 rounded-md">
                        <span style={{width: `${goalProgress}%`}} className={`bg-[#73FFA3] rounded-md h-full`}></span>
                    </div>
                    <div className="w-[94%] text-[.92rem]">
                        <p style={{paddingLeft: `${goalProgress - 5}%`}}>{goalProgress}%</p>
                    </div>
                </div>
            </div>

            
        </div>
    )
}