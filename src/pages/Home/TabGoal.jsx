import { useEffect, useState } from "react";
import TabGoalProgress from "./TabGoalProgress";
import TabGoalTask from "./TabGoalTask";

export default function TabGoal({ goal }) {
    const [goalProgress, setGoalProgress] = useState()

    useEffect(() => getGoalProgress(), [])

    const getGoalProgress = () => {
        let doneTasks = 0
        let notDoneTasks = 0

        goal?.tasks?.map(task => {
            task.isComplete ? doneTasks++ : notDoneTasks++
        })
        
        setGoalProgress(Math.floor((doneTasks / (doneTasks + notDoneTasks)) * 100))
    }

    return (
        <div className="flex flex-col w-full h-52 border-[1px] border-white rounded-md my-3">
            <p className="text-[.92rem] font-bold ml-2 mt-1">{goal.title}</p>

            {/* TODO: remove this id */}
            <div id="goal-tasks-window" className="overflow-y-auto">
                {goal.tasks.map((task, taskIndex) => <TabGoalTask taskContent={task.taskContent} isComplete={task.isComplete} key={taskIndex} />)}
            </div>

            <TabGoalProgress goalProgress={goalProgress} />
        </div>
    )
}