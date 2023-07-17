import { arrayUnion, collection, doc, getDocs, setDoc } from "firebase/firestore"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { auth, db } from "../firebase-config"
import { useAuthState } from "react-firebase-hooks/auth"

const TodoContextProvider = createContext()

export default function TodoContext({ children }) {
    const [columns, setColumns] = useState([])
    const [cards, setCards] = useState([])
    const [columnsOrder, setColumnsOrder] = useState([])
    const [isDataRetrieved, setIsDataRetrieved] = useState(false)
    const [user] = useAuthState(auth)

    const effectRan = useRef(false)
    
    useEffect(() => {
        if (effectRan.current) {
            return
        }

        if (!user) {
            return
        }

        // get data for all todo page
        const getTodoData = async () => {
            let columnsDocs = await getDocs(collection(db, `users/${user.uid}/columns`))
            let columnsSnapshot = columnsDocs.docs.map((doc) => ({ ...doc.data() }))

            let cardsDocs = await getDocs(collection(db, `users/${user.uid}/cards`))
            let cardsSnapshot = cardsDocs.docs.map((doc) => ({ ...doc.data() }))

            let columnsOrderDocs = await getDocs(collection(db, `users/${user.uid}/columnsOrder`))
            let columnsOrderSnapshot = columnsOrderDocs.docs.map((doc) => ({ ...doc.data() }))

            setColumns(columnsSnapshot)
            setCards(cardsSnapshot)
            
            setColumnsOrder(columnsOrderSnapshot[0]?.order ? columnsOrderSnapshot[0]?.order : [])
            setIsDataRetrieved(true)
        }

        getTodoData()

        return () => effectRan.current = true
    }, [user])

    const addNewColumn = async () => {
        let newColumnId = crypto.randomUUID()

        let newColumn = { id: newColumnId, droppableColumnId: crypto.randomUUID(), title: 'New Column', cards: [] }
        setDoc(doc(db, `users/${user.uid}/columns`, newColumnId), newColumn)

        // add column to order in client
        setColumns(prev => [...prev, newColumn])
        setColumnsOrder(prev => [...prev, newColumnId])

        // add column to order in database
        changeColumnsOrder("add", newColumnId)
    }

    const changeColumnsOrder = (method, newOrder) => {
        let newDocs

        switch (method) {
            case "add":
                newDocs = {
                    order: arrayUnion(newOrder)
                }
                break;
            
            case "replace":
                newDocs = {
                    order: newOrder
                }
                break;

            default:
                return
        }

        setDoc(doc(db, `users/${user.uid}/columnsOrder`, "order"), newDocs, { merge: true })
    }

    const value = {
        columns,
        setColumns,
        cards,
        setCards,
        columnsOrder,
        setColumnsOrder,
        isDataRetrieved,
        addNewColumn,
        changeColumnsOrder,
    }
    return (
        <TodoContextProvider.Provider value={value}>
            { children }
        </TodoContextProvider.Provider>
    )
}

export const useTodoContext = () => useContext(TodoContextProvider)