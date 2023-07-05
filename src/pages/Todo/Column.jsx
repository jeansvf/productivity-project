import { IoIosAdd } from "react-icons/io";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import Item from "./Item";
import { useState } from "react";
import TemporaryCard from "./TemporaryCard";
import { AnimatePresence } from "framer-motion";

export default function Column({ setColumns, columns, columnId, columnIndex, orderIndex, droppableColumnId, title, setCards, cards }) {

    const [showTemporaryCard, setShowTemporaryCard] = useState(false)

    const addNewCard = async (card) => {
        setShowTemporaryCard(false)
        
        let newCard = { id: crypto.randomUUID(), text: card.text, color: card.color }
        
        // create card id in the column cards order
        let newColumns = structuredClone(columns)

        newColumns[columnIndex].cards.push(newCard)

        // create card in the client
        setColumns(newColumns)
        setCards(prev => [...prev, newCard])

        // add new card to "cards" subcollection
        setDoc(doc(db, `users/${auth.currentUser.uid}/cards`, newCard.id), newCard)

        // add new card's id to "columns[currentColumn].cards"
        updateDoc(doc(db, `users/${auth.currentUser.uid}/columns/${columns[columnIndex].id}`), {
            cards: arrayUnion(newCard)
        })
    }

    return (
        <Draggable draggableId={columnId} index={orderIndex}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex flex-col items-center w-80 h-max mx-2 bg-[#2E2E2E] rounded-[.4rem]"
                >
                    <h2 {...provided.dragHandleProps} className="w-[90%] py-4 font-semibold text-[17px]">{title}</h2>

                    <Droppable droppableId={droppableColumnId} /* CHECK THIS */ type="card" >
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="flex flex-col items-center w-[92%] h-full min-h-[1rem]"
                            >
                                {columns[columnIndex].cards.map((order, orderIndex) => (
                                    cards.map((card) => (
                                        card?.id == order?.id ? (
                                            card == undefined ? null : <Item text={card.text} id={card.id} color={card.color} draggableIndex={orderIndex} key={card.id} />
                                        ) : null
                                    ))
                                ))}

                                <AnimatePresence>
                                    {showTemporaryCard ? (
                                        <TemporaryCard addNewCard={addNewCard} setShowTemporaryCard={setShowTemporaryCard} />
                                    ) : null}
                                </AnimatePresence>

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <button onClick={() => setShowTemporaryCard(true)} className="flex w-[92%] pt-1 pb-3 items-center select-none"><IoIosAdd className="text-2xl" /> Add Card</button>
                </div>
            )}
        </Draggable>
    )
}