import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { auth, db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import Goal from "./Goal";
import TemporaryGoal from "./TemporaryGoal";

export default function Goals() {
    useEffect(() => {
        getUserGoals()
    }, [])
    
    const [goals, setGoals] = useState()
    const [creatingTemporaryGoal, setCreatingTemporaryGoal] = useState(false)

    const getUserGoals = async () => {
        let goalsDocs = await getDocs(query(collection(db, "goals"), where("goalOwnerUid", "==", auth.currentUser.uid)))
        let goalsSnapshot = goalsDocs.docs.map((doc) => ({ ...doc.data() }))
        setGoals(goalsSnapshot)
    }

    return (
        <main className="flex w-full pt-20 text-white">
            {goals ? goals?.map((goal, index) => (
                <Goal goal={goal} key={index} />
            )) : null}

            {creatingTemporaryGoal ? (
                <TemporaryGoal getUserGoals={getUserGoals} setCreatingTemporaryGoal={setCreatingTemporaryGoal} />
            ) : null}

            <IoIosAdd onClick={() => setCreatingTemporaryGoal(true)} className="absolute right-10 bottom-10 w-12 h-12 cursor-pointer rounded-full bg-white text-black hover:bg-opacity-60" />
        </main>
    )
}