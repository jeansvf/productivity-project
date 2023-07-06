import { IoIosAdd } from "react-icons/io";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import Item from "./Item";
import { useEffect, useRef, useState } from "react";
import TemporaryCard from "./TemporaryCard";
import { AnimatePresence, motion } from "framer-motion";
import { RxDragHandleDots2 } from "react-icons/rx";

export default function Column({ setColumns, columns, columnId, columnIndex, orderIndex, droppableColumnId, title, setCards, cards }) {

    const [showTemporaryCard, setShowTemporaryCard] = useState(false)
    const [isHoveringTitle, setIsHoveringTitle] = useState(false)

    const writingTimeout = useRef()

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

    const changeTitle = (title) => {
        clearTimeout(writingTimeout.current)
        
        let newColumns = structuredClone(columns)
        newColumns[columnIndex].title = title
        
        setColumns(newColumns)
        
        if (title == "") {
            return
        }

        writingTimeout.current = setTimeout(() => {
            updateDoc(doc(db, `users/${auth.currentUser.uid}/columns/${columnId}`), {
                title: title
            })
            console.log("updated");
        }, 600);
    }

    return (
        <Draggable draggableId={columnId} index={orderIndex}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex flex-col items-center w-80 h-max mx-2 bg-[#2E2E2E] rounded-[.4rem]"
                >
                    <div onMouseOver={() => setIsHoveringTitle(true)} onMouseOut={() => setIsHoveringTitle(false)} className="relative flex items-center w-[90%] my-4">
                        <input onChange={(event) => changeTitle(event.target.value)} className="bg-transparent font-semibold text-[17px]" type="text" value={title} />
                        <div {...provided.dragHandleProps} className="absolute right-0 text-2xl">
                            <AnimatePresence>
                                {isHoveringTitle ? (
                                    <motion.div
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        className="flex items-center h-7 rounded-sm bg-white bg-opacity-0 hover:bg-opacity-20"
                                    >
                                        <RxDragHandleDots2 />
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
                        </div>
                    </div>

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

                    <button onClick={() => setShowTemporaryCard(true)} className="flex self-start mt-1 mb-3 ml-3 pr-1 items-center select-none"><IoIosAdd className="text-2xl" /> Add Card</button>
                </div>
            )}
        </Draggable>
    )
}