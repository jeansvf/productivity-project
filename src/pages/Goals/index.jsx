import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { auth, db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import Goal from "./Goal";
import TemporaryGoal from "./TemporaryGoal";

export default function Goals() {
    const [goals, setGoals] = useState()
    const [creatingTemporaryGoal, setCreatingTemporaryGoal] = useState(false)
    
    useEffect(() => {
        getUserGoals()
    }, [])

    const getUserGoals = async () => {
        let goalsDocs = await getDocs(query(collection(db, "goals"), where("goalOwnerUid", "==", auth.currentUser.uid)))
        let goalsSnapshot = goalsDocs.docs.map((doc) => ({ ...doc.data() }))
        setGoals(goalsSnapshot)
    }

    return (
        <main className="flex w-full pl-2 pt-20 text-white">
            {goals ? goals?.map((goal, goalIndex) => (
                <Goal goals={goals} goal={goal} goalIndex={goalIndex} setGoals={setGoals} key={goalIndex} />
            )) : null}

            {creatingTemporaryGoal ? (
                <TemporaryGoal getUserGoals={getUserGoals} setCreatingTemporaryGoal={setCreatingTemporaryGoal} />
            ) : null}

            <IoIosAdd onClick={() => setCreatingTemporaryGoal(true)} className="absolute right-10 bottom-10 w-12 h-12 cursor-pointer rounded-full bg-white text-black hover:bg-opacity-60" />
        </main>
    )
}