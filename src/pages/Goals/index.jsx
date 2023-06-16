import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { auth, db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import Goal from "./Goal";
import TemporaryGoal from "./TemporaryGoal";
import DateLine from "./DateLine";
import LoadingAnimation from "../../components/LoadingAnimation";
import { AnimatePresence, motion } from "framer-motion";

export default function Goals() {
    const [goals, setGoals] = useState()
    const [creatingTemporaryGoal, setCreatingTemporaryGoal] = useState(false)
    const [dates, setDates] = useState([])
    
    useEffect(() => {
        getUserGoals()
    }, [])
    
    useEffect(() => {
        // when goals change, change dates
        goals ? getDates() : null
    }, [goals])

    const getUserGoals = async () => {
        let goalsDocs = await getDocs(query(collection(db, "goals"), where("goalOwnerUid", "==", auth.currentUser.uid)))
        let goalsSnapshot = goalsDocs.docs.map((doc) => ({ ...doc.data() }))
        setGoals(goalsSnapshot)
    }

    const getDates = () => {
        // removes date duplicates and convert into month and year
        let newDates = []
        goals ? goals?.map((goal) => {
            newDates.push(getMonthAndYear(goal.goalDate))
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
        <main className="w-full pl-2 pt-14 text-white">

            <AnimatePresence>
                {goals ? dates?.map((date, dateIndex) => (
                    <div key={dateIndex}>
                        <DateLine date={date} />
                        <div className="flex flex-wrap w-full">
                            <AnimatePresence>
                                {
                                    goals?.map((goal, goalIndex) => (
                                        getMonthAndYear(goal.goalDate) == getMonthAndYear(date) ? (
                                            <Goal goals={goals} goal={goal} goalIndex={goalIndex} setGoals={setGoals} getUserGoals={getUserGoals} key={goalIndex} />
                                        ) : null
                                    ))
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
            
            <div className="flex">
                <AnimatePresence>
                    {
                        creatingTemporaryGoal ? (
                            <div className="w-full">
                                <DateLine date={"placeholder"} />
                                <TemporaryGoal getUserGoals={getUserGoals} setCreatingTemporaryGoal={setCreatingTemporaryGoal} />
                            </div>
                        ) : null
                    }
                </AnimatePresence>
            </div>

            {goals ? goals?.length !== 0 ? <DateLine /> : null : null}

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
            onClick={() => setCreatingTemporaryGoal(true)} className="fixed right-10 bottom-10 w-12 h-12 rounded-full bg-white text-black hover:bg-opacity-60">
                <IoIosAdd className="w-full h-full" />
            </motion.button>
        </main>
    )
}