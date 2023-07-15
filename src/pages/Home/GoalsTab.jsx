import { VscAdd } from "react-icons/vsc"
import { Link } from "react-router-dom"
import TabGoal from "./TabGoal"
import { useEffect, useState } from "react"
import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { auth, db } from "../../firebase-config"

export default function GoalsTab() {
    const [goals, setGoals] = useState([])
    
    // TODO: make this a context
    useEffect(() => {
        getDocs(query(collection(db, "goals"), where("goalOwnerUid", "==", auth.currentUser.uid), where("isGoalComplete", "==", false), limit(3)))
        .then((response) => setGoals(response.docs.map((doc) => doc.data())))
    }, [])

    return (
        <div className="w-72 h-[36rem] px-3.5 py-3 rounded-md bg-[#2E2E2E] overflow-auto">
            <p className="text-xl font-bold">Goals</p>

            {goals.length > 0 ? <p className="text-base mt-1 mb-2 opacity-60">Recent Goals</p> : <p className="text-base mt-1 mb-2 opacity-60">You don't have any goals yet.</p>}    
            
            {goals ? goals.map((goal, goalIndex) => <TabGoal goal={goal} key={goalIndex} />) : null}
            
            <Link to="/goals" className="flex items-center opacity-60 justify-center w-full h-28 border-[1px] border-white cursor-pointer rounded-md hover:opacity-100">
                <div className="h-fit select-none">
                    <VscAdd className="w-full h-10" />
                    <p>Create a goal</p>
                </div>
            </Link>
        </div>
    )
}