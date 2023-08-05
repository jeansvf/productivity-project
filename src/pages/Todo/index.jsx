import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Column from './Column';
import AddListButton from './AddListButton';
import LoadingAnimation from '../../components/LoadingAnimation';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { auth, db } from "../../firebase-config";
import { useTodoContext } from '../../contexts/TodoContext';
import { useAuthState } from "react-firebase-hooks/auth"

// TODO: fix login and register errors

export default function Todo() {
    const {columns, setColumns, cards, setCards, columnsOrder, setColumnsOrder, isDataRetrieved, addNewColumn, changeColumnsOrder } = useTodoContext()

    const [user] = useAuthState(auth)

    const deleteColumn = async (columnIndex) => { 
        let newColumns = structuredClone(columns)
        let newColumnsOrder = structuredClone(columnsOrder)

        let selectedColumnId = newColumns[columnIndex].id

        newColumns.splice(columnIndex, 1)
        newColumnsOrder.map((column, index) => column == selectedColumnId ? newColumnsOrder.splice(index, 1) : null)

        setColumns(newColumns)
        setColumnsOrder(newColumnsOrder)

        deleteDoc(doc(db, `users/${user.uid}/columns/${selectedColumnId}`))

        let snapshot = await getDocs(query(collection(db, `users/${user.uid}/cards`), where("columnOrigin", "==", columns[columnIndex].id)))
        snapshot.forEach((doc) => deleteDoc(doc.ref))

        changeColumnsOrder("replace", newColumnsOrder)
    }

    const handleOnDragEnd = (result) => {
        // if source and destination are the same return
        if (result.source?.droppableId == result.destination?.droppableId && result.source?.index == result.destination?.index || !result.destination) {
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
            changeColumnsOrder("replace", newColumnsOrder)
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
            updateDoc(doc(db, `users/${user.uid}/columns/${newColumns[cardColumnSourceId].id}`), {
                cards: newColumns[cardColumnSourceId].cards
            })

            // add card to destination colum
            updateDoc(doc(db, `users/${user.uid}/columns/${newColumns[cardColumnDestinationId].id}`), {
                cards: newColumns[cardColumnDestinationId].cards
            })
            
            updateDoc(doc(db, `users/${user.uid}/cards/${selectedCard.id}`), {
                columnOrigin: newColumns[cardColumnDestinationId].id
            })
            
            return
        }
    }

    return (
        <main className='relative flex pl-4 pt-20 w-fit h-screen overflow-x-auto bg-[#393939] text-white z-10'>
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
                                                    <Column deleteColumn={deleteColumn} setColumns={setColumns} columns={columns} setCards={setCards} cards={cards} columnId={column.id} columnIndex={columnIndex} orderIndex={orderIndex} droppableColumnId={column.droppableColumnId} title={column.title} key={column.id} />
                                                ) : null
                                            ))
                                        ))}
        
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    
                    <AddListButton addNewColumn={addNewColumn} columns={columns} />
                </>
                ) : (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <LoadingAnimation width="7" height="7" />
                </div>
                )}
        </main>
    )
}