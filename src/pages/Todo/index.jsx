import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import { useState } from 'react';
import AddListButton from './AddListButton';
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from "../../firebase-config";
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Todo() {
    const [columns, setColumns] = useState([])
    const [cards, setCards] = useState([])
    const [columnsOrder, setColumnsOrder] = useState([])

    // useEffect(() => {
    //     console.log("columns: ", columns);
    // }, [columns])
    
    // useEffect(() => {
    //     console.log("cards: ", cards);
    // }, [cards])
    
    // useEffect(() => {
    //     console.log("columnsOrder: ", columnsOrder);
    // }, [columnsOrder])

    const effectRan = useRef(false)
    
    useEffect(() => {
        if (effectRan.current) {
            return
        }

        // get data for all todo page
        const getTodoData = async () => {
            let columnsDocs = await getDocs(collection(db, `users/${auth.currentUser.uid}/columns`))
            let columnsSnapshot = columnsDocs.docs.map((doc) => ({ ...doc.data() }))

            let cardsDocs = await getDocs(collection(db, `users/${auth.currentUser.uid}/cards`))
            let cardsSnapshot = cardsDocs.docs.map((doc) => ({ ...doc.data() }))

            let columnsOrderDocs = await getDocs(collection(db, `users/${auth.currentUser.uid}/columnsOrder`))
            let columnsOrderSnapshot = columnsOrderDocs.docs.map((doc) => ({ ...doc.data() }))

            setColumns(columnsSnapshot)
            setCards(cardsSnapshot)
            
            setColumnsOrder(columnsOrderSnapshot[0]?.order ? columnsOrderSnapshot[0]?.order : [])
        }

        getTodoData()
        
        return () => effectRan.current = true
    }, [])

    const addNewColumn = async () => {
        let newColumnId = crypto.randomUUID()

        let newColumn = { id: newColumnId, droppableColumnId: 'droppableColumn-4', title: '5345234523452345', cards: [] }
        setDoc(doc(db, `users/${auth.currentUser.uid}/columns`, newColumnId), newColumn)

        // add column to order in client
        setColumns(prev => [...prev, newColumn])
        setColumnsOrder(prev => [...prev, newColumnId])

        console.log("columns: ", columns);
        console.log("columnsOrder: ", columnsOrder);

        // add column to order in database
        changeColumnsOrder(newColumnId)
    }

    const changeColumnsOrder = (newOrder) => {
        let newDocs = {
            order: arrayUnion(newOrder)
        }

        // if a column exists update columnsOrder, else create columnsOrder
        if (columns.length >= 1) {
            updateDoc(doc(db, `users/${auth.currentUser.uid}/columnsOrder`, "order"), newDocs)
        } else {
            setDoc(doc(db, `users/${auth.currentUser.uid}/columnsOrder`, "order"), newDocs)
        }
    }

    const handleOnDragEnd = (result) => {
        if (result.destination == null) {
            return
        }

        if (result.type == 'column') {
            // clone columnsOrder state
            let newColumnsOrder = structuredClone(columnsOrder)

            let selectedColumn = newColumnsOrder[result.source.index]

            // remove column and add it to new position
            newColumnsOrder.splice(result.source.index, 1)
            newColumnsOrder.splice(result.destination.index, 0, selectedColumn)

            // update columns order on client
            setColumnsOrder(newColumnsOrder)
    
            // update columns order on database
            changeColumnsOrder(newColumnsOrder)

            return
        }

        if (result.type == 'card') {
            // clone columns state
            let newColumns = structuredClone(columns)
            
            let cardColumnSource
            columns.map((column, columnIndex) => column.droppableColumnId == result.source.droppableId ? cardColumnSource = columnIndex : null)

            let cardColumnDestination
            columns.map((column, columnIndex) => column.droppableColumnId == result.destination.droppableId ? cardColumnDestination = columnIndex : null)

            let selectedCard = columns[cardColumnSource].cards[result.source.index]

            // remove card and add it to new position
            newColumns[cardColumnSource].cards.splice(result.source.index, 1)
            newColumns[cardColumnDestination].cards.splice(result.destination.index, 0, selectedCard)
            
            // update columns state with newColumns
            setColumns(newColumns)

            return
        }
    }

    return (
        <main className='flex pl-2 pt-20 w-full h-screen overflow-x-scroll bg-[#393939] text-white z-10'>
            <div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='main' direction='horizontal' type='column'>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className='flex'
                            >
                                {columnsOrder?.map((order, orderIndex) => (
                                    columns?.map((column, columnIndex) => (
                                        order == column.id ? (
                                            <Column setColumns={setColumns} columns={columns} setCards={setCards} cards={cards} columnId={column.id} columnIndex={columnIndex} orderIndex={orderIndex} droppableColumnId={column.droppableColumnId} title={column.title} key={column.id} />
                                        ) : null
                                    ))
                                ))}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <AddListButton addNewColumn={addNewColumn} />
        </main>
    )
}