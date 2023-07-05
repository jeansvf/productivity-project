import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import { useState } from 'react';
import AddListButton from './AddListButton';
import LoadingAnimation from '../../components/LoadingAnimation';
import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from "../../firebase-config";
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Todo() {
    const [columns, setColumns] = useState([])
    const [cards, setCards] = useState([])
    const [columnsOrder, setColumnsOrder] = useState([])
    const [isDataRetrieved, setIsDataRetrieved] = useState(false)

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
            setIsDataRetrieved(true)
        }

        getTodoData()

        return () => effectRan.current = true
    }, [])

    const addNewColumn = async () => {
        let newColumnId = crypto.randomUUID()

        let newColumn = { id: newColumnId, droppableColumnId: crypto.randomUUID(), title: '5345234523452345', cards: [] }
        setDoc(doc(db, `users/${auth.currentUser.uid}/columns`, newColumnId), newColumn)

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

        // if a column exists update columnsOrder, else create columnsOrder
        if (columns.length >= 1) {
            updateDoc(doc(db, `users/${auth.currentUser.uid}/columnsOrder`, "order"), newDocs)
        } else {
            setDoc(doc(db, `users/${auth.currentUser.uid}/columnsOrder`, "order"), newDocs)
        }
    }

    const handleOnDragEnd = (result) => {
        // TODO: prevent destination of being the same as the source
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
            changeColumnsOrder("replace" , newColumnsOrder)
            return
        }

        if (result.type == 'card') {
            // clone columns state
            let newColumns = structuredClone(columns)

            let cardColumnSourceId
            columns.map((column, columnIndex) => column.droppableColumnId == result.source.droppableId ? cardColumnSourceId = columnIndex : null)
            
            let cardColumnDestinationId
            columns.map((column, columnIndex) => column.droppableColumnId == result.destination.droppableId ? cardColumnDestinationId = columnIndex : null)

            let selectedCard = columns[cardColumnSourceId].cards[result.source.index]
            
            // undefined card bug fix
            if (selectedCard == undefined) {
                return
            }

            // remove card and add it to new position
            newColumns[cardColumnSourceId].cards.splice(result.source.index, 1)
            newColumns[cardColumnDestinationId].cards.splice(result.destination.index, 0, selectedCard)

            // update columns state with newColumns
            setColumns(newColumns)

            // remove card from source column
            updateDoc(doc(db, `users/${auth.currentUser.uid}/columns/${newColumns[cardColumnSourceId].id}`), {
                cards: newColumns[cardColumnSourceId].cards
            })
            
            // FIXME: if any of this items is undefined, return (I THINK THE ERROR IS HERE)
            // FIXME: check the moment that the card is added to not add nothing undefined

            // add card to destination colum
            updateDoc(doc(db, `users/${auth.currentUser.uid}/columns/${newColumns[cardColumnDestinationId].id}`), {
                cards: newColumns[cardColumnDestinationId].cards
            })
            
            return
        }
    }

    return (
        <main className='flex pl-2 pt-20 w-full h-screen overflow-x-scroll bg-[#393939] text-white z-10'>
            {isDataRetrieved ? (
                <>
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
                </>
                ) : (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <LoadingAnimation width="7" height="7" />
                </div>
                )}
        </main>
    )
}