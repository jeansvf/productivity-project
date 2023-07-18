import { IoIosAdd } from "react-icons/io";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import Item from "./Item";
import { useRef, useState } from "react";
import TemporaryCard from "./TemporaryCard";
import { AnimatePresence, motion } from "framer-motion";
import { RxDragHandleDots2 } from "react-icons/rx";
import { FaTrash } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Column({ deleteColumn, setColumns, columns, columnId, columnIndex, orderIndex, droppableColumnId, title, setCards, cards }) {
    const [showTemporaryCard, setShowTemporaryCard] = useState(false)
    const [isHoveringTitle, setIsHoveringTitle] = useState(false)

    const writingTimeout = useRef()

    const [user] = useAuthState(auth)

    const addNewCard = (card) => {
        if (!card.text) {
            return
        }

        setShowTemporaryCard(false)
        
        let newCard = { id: crypto.randomUUID(), text: card.text, color: card.color, description: card.description, columnOrigin: columns[columnIndex].id }
        
        // create card id in the column cards order
        let newColumns = structuredClone(columns)

        newColumns[columnIndex].cards.push(newCard)

        // create card in the client
        setColumns(newColumns)
        setCards(prev => [...prev, newCard])

        // add new card to "cards" subcollection
        setDoc(doc(db, `users/${user.uid}/cards`, newCard.id), newCard)

        // add new card's id to "columns[currentColumn].cards"
        updateDoc(doc(db, `users/${user.uid}/columns/${columns[columnIndex].id}`), {
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
            updateDoc(doc(db, `users/${user.uid}/columns/${columnId}`), {
                title: title
            })
        }, 600)
    }

    return (
        <Draggable draggableId={columnId} index={orderIndex}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="relative flex flex-col items-center w-80 h-max max-h-[90vh] mx-2 bg-[#2E2E2E] rounded-[.4rem]"
                >
                    <div onMouseOver={() => setIsHoveringTitle(true)} onMouseOut={() => setIsHoveringTitle(false)} className="relative flex items-center w-[92%] my-4">
                        <input onChange={(event) => changeTitle(event.target.value)} className="bg-transparent font-semibold text-[17px] w-2/3" type="text" value={title} />
                        <div className="flex absolute justify-end right-0 w-20">
                            <AnimatePresence>
                                {isHoveringTitle ? (
                                    <motion.button
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        type="button"
                                        onClick={() => deleteColumn(columnIndex)}
                                        className="flex justify-center items-center h-7 px-1 mr-1 rounded-sm bg-white bg-opacity-0 hover:bg-opacity-20 text-lg hover:text-red-400"
                                    >
                                        <FaTrash />
                                    </motion.button>
                                ) : null}
                            </AnimatePresence>
                            
                            <div {...provided.dragHandleProps} className="text-2xl">
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
                    </div>

                    <Droppable droppableId={droppableColumnId} type="card" >
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="relative flex flex-col items-center overflow-y-auto w-[92%] h-full min-h-[.8rem]"
                                id="goal-tasks-window"
                            >
                                {columns[columnIndex].cards.map((order, orderIndex) => (
                                    cards.map((card, cardIndex) => (
                                        card?.id == order?.id ? (
                                            card == undefined ? null : <Item columnIndex={columnIndex} cardIndex={cardIndex} text={card.text} description={card.description} id={card.id} color={card.color} orderIndex={orderIndex} key={card.id} />
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

                    <button onClick={() => setShowTemporaryCard(true)} className="flex self-start mt-auto w-full ml-3 pr-1 py-2.5 items-end select-none"><IoIosAdd className="text-2xl" /> Add Card</button>
                </div>
            )}
        </Draggable>
    )
}