import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { auth, db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import Goal from "./Goal";
import TemporaryGoal from "./TemporaryGoal";
import DateLine from "./DateLine";
import LoadingAnimation from "../../components/LoadingAnimation";

export default function Goals() {
    const [goals, setGoals] = useState()
    const [creatingTemporaryGoal, setCreatingTemporaryGoal] = useState(false)
    const [dates, setDates] = useState([])
    
    useEffect(() => {
        getUserGoals()
    }, [])
    
    useEffect(() => {
        goals ? getDates() : null
    }, [goals])

    const getUserGoals = async () => {
        let goalsDocs = await getDocs(query(collection(db, "goals"), where("goalOwnerUid", "==", auth.currentUser.uid)))
        let goalsSnapshot = goalsDocs.docs.map((doc) => ({ ...doc.data() }))
        setGoals(goalsSnapshot)
    }

    const getDates = () => {
        let newDates = []
        goals ? goals?.map((goal) => {
            newDates.push(goal.goalDate)
        }) : null
        setDates(removeDuplicates(newDates))
    }

    function removeDuplicates(arr) {
        const uniqueValues = {}
        
        for (let i = 0; i < arr.length; i++) {
            uniqueValues[arr[i]] = true
        }
        
        return Object.keys(uniqueValues)
    }

    return (
        <main className="w-full pl-2 pt-14 text-white">
            
            {goals ? dates?.map((date, dateIndex) => (
                <div key={dateIndex}>
                    <DateLine date={date} />
                    <div className="flex">
                        {
                            goals?.map((goal, goalIndex) => (
                            goal.goalDate == date ? (
                                <Goal goals={goals} goal={goal} goalIndex={goalIndex} setGoals={setGoals} getUserGoals={getUserGoals} key={goalIndex} />
                            ) : null))
                        }
                    </div>
                </div>
            )) : (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <LoadingAnimation width="7" height="7" />
                </div>
            )}
            
            <div className="flex">
                {creatingTemporaryGoal ? (
                    <div className="w-full">
                        <DateLine date={"placeholder"} />
                        <TemporaryGoal getUserGoals={getUserGoals} setCreatingTemporaryGoal={setCreatingTemporaryGoal} />
                    </div>
                ) : null}
            </div>

            {goals ? goals?.length !== 0 ? <DateLine /> : null : null}

            <IoIosAdd onClick={() => setCreatingTemporaryGoal(true)} className="fixed right-10 bottom-10 w-12 h-12 cursor-pointer rounded-full bg-white text-black hover:bg-opacity-60" />
        </main>
    )
}