import { collection, getDocs, query, where } from "firebase/firestore"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { auth, db } from "../firebase-config"
import { onAuthStateChanged } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"

const GoalsContextProvider = createContext()

export default function GoalsContext({ children }) {
    const [goals, setGoals] = useState([])
    const [loading, setLoading] = useState([])

    const effectRan = useRef(false)

    const [user] = useAuthState(auth)
    
    useEffect(() => {
        if (effectRan.current) {
            return
        }
        getUserGoals()
        
        return () => effectRan.current = false
    }, [])

    useEffect(() => {
        getUserGoals()
    }, [user])

    const getUserGoals = async () => {
        setLoading(true)
        if (user) {
            let goalsDocs = await getDocs(query(collection(db, "goals"), where("goalOwnerUid", "==", user.uid)))
            let goalsSnapshot = goalsDocs.docs.map((doc) => ({ ...doc.data() }))
            setGoals(goalsSnapshot)
        }
        setLoading(false)
    }

    const value = {
        goals,
        setGoals,
        getUserGoals,
        loading
    }

    return (
        <GoalsContextProvider.Provider value={value}>
            { children }
        </GoalsContextProvider.Provider>
    )
}

export const useGoalsContext = () => useContext(GoalsContextProvider)