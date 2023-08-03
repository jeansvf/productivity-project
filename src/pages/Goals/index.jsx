import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Goal from "./Goal";
import TemporaryGoal from "./TemporaryGoal";
import DateLine from "./DateLine";
import LoadingAnimation from "../../components/LoadingAnimation";
import { AnimatePresence, motion } from "framer-motion";
import CompletedGoal from "./CompletedGoal";
import { useGoalsContext } from "../../contexts/GoalsContext";

export default function Goals() {
    const [creatingTemporaryGoal, setCreatingTemporaryGoal] = useState(false)
    const [dates, setDates] = useState([])
    const [showCompletedGoalsLine, setShowCompletedGoalsLine] = useState(false)
    
    const { goals, setGoals, getUserGoals, loading } = useGoalsContext()

    useEffect(() => {
        if (!goals) {
            return
        }
        getDates()
        
        goals.map(goal => goal.isGoalComplete ? setShowCompletedGoalsLine(true) : null)
    }, [goals])

    const getDates = () => {
        let newDates = []
        goals ? goals?.map((goal) => {
            !goal.isGoalComplete ? newDates.push(getMonthAndYear(goal.goalDate)) : null
        }) : null

        setDates(removeDuplicates(newDates))
    }

    const removeDuplicates = (arr) => {
        const uniqueValues = {}
        
        for (let i = 0; i < arr.length; i++) {
            uniqueValues[arr[i]] = true
        }
        
        return Object.keys(uniqueValues)
    }

    const getMonthAndYear = (dateParameter) => {
        let year = dateParameter.charAt(0) + dateParameter.charAt(1) + dateParameter.charAt(2) + dateParameter.charAt(3)
        let month = dateParameter.charAt(4) + dateParameter.charAt(5) + dateParameter.charAt(6)

        return year + month
    }

    return (
        <main className="w-full h-screen pl-2 pt-14 text-white bg-[#393939] z-10">
            <AnimatePresence>
                {/* incomplete goals */}
                {goals ? dates?.map((date, dateIndex) => (
                    <div key={dateIndex}>
                        <DateLine date={date} />
                        <div className="flex flex-wrap w-full">
                            <AnimatePresence>
                                {
                                    goals?.map((goal, goalIndex) => {
                                        return getMonthAndYear(goal.goalDate) == getMonthAndYear(date) ? (
                                            !goal.isGoalComplete ? (
                                                <Goal goals={goals} goal={goal} goalIndex={goalIndex} setGoals={setGoals} getUserGoals={getUserGoals} key={goalIndex} />
                                            ) : null
                                        ) : null
                                    })
                                }
                            </AnimatePresence>
                        </div>
                    </div>
                )) : (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <LoadingAnimation width="7" height="7" />
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {goals?.length == 0 && !creatingTemporaryGoal && !loading ? (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute ml-11 mt-14">
                        <p className="text-[2.5rem] leading-10 opacity-50 font-semibold text-white">You don’t have any Goals!</p>
                        <div className="flex items-center ml-0.5 mt-4 text-2xl opacity-50 font-semibold text-white">
                            <p>Press the&nbsp;</p>
                            <div className="w-7 h-7 rounded-full bg-white text-black">
                                <IoIosAdd className="w-full h-full" />
                            </div>
                            <p>&nbsp;button to create a goal</p>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            {/* creating goal */}
            <div className="flex">
                <AnimatePresence>
                    {creatingTemporaryGoal ? (
                        <div className="w-full">
                            <DateLine date={"placeholder"} />
                            <TemporaryGoal getUserGoals={getUserGoals} setCreatingTemporaryGoal={setCreatingTemporaryGoal} />
                        </div>
                    ) : null}
                </AnimatePresence>
            </div>

            {/* completed goals */}
            <AnimatePresence>
                <div>
                    {/* if any completed goal exists, render dateline */}
                    {showCompletedGoalsLine ? <DateLine date={"completed"} /> : null}
                    <div className="flex flex-wrap w-full">
                        {goals?.map((goal, goalIndex) => {
                            return goal.isGoalComplete ? (
                                <CompletedGoal goal={goal} key={goalIndex} />
                            ) : null
                        })}
                    </div>
                </div>
            </AnimatePresence>

            {/* goals bottom line */}
            {goals ? goals?.length !== 0 ? <DateLine /> : null : null}

            {/* add goal button */}
            <motion.button
                initial={{
                    bottom: -30
                }}
                animate={{
                    rotateZ: 90,
                    bottom: 40
                }}
                transition={{
                    type: "spring",
                    duration: .8
                }}
                onClick={() => setCreatingTemporaryGoal(true)} className="fixed right-10 bottom-10 w-12 h-12 rounded-full bg-white text-black hover:bg-opacity-60"
            >
                <IoIosAdd className="w-full h-full" />
            </motion.button>
        </main>
    )
}