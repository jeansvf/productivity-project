import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { RxDragHandleDots2 } from "react-icons/rx"
import { AiFillEdit } from "react-icons/ai"
import { doc, updateDoc } from "firebase/firestore";
import { TfiClose } from "react-icons/tfi"
import { auth, db } from "../../firebase-config"

export default function Item({ setCards, cards, cardIndex, text, description, id, color, draggableIndex }) {
    const [isHoveringCard, setIsHoveringCard] = useState(false)
    const [isCardOpened, setIsCardOpened] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editingValues, setEditingValues] = useState({
        text: cards[cardIndex].text,
        description: cards[cardIndex].description,
        color: cards[cardIndex].color,
    })

    const changeCardValues = () => {
        setIsEditing(false)

        let newCards = structuredClone(cards)
        newCards[cardIndex].text = editingValues.text
        newCards[cardIndex].description = editingValues.description
        newCards[cardIndex].color = editingValues.color

        setCards(newCards)

        updateDoc(doc(db, `users/${auth.currentUser.uid}/cards/${cards[cardIndex].id}`), editingValues)
    }

    return (
        <Draggable draggableId={id} index={draggableIndex}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`relative flex items-start bg-[#4F4F4F] w-full min-h-[2.5rem] mb-2 rounded-[.25rem]`}
                    onMouseOver={() => setIsHoveringCard(true)} onMouseOut={() => setIsHoveringCard(false)}
                >
                    <div className={`w-1.5 absolute left-0 top-0 h-full rounded-tl-[.25rem] rounded-bl-[.25rem] bg-[#${isEditing ? editingValues.color :  color}]`}></div>

                    <div className="flex flex-col w-full pl-3">
                        {/* card title */}
                        {isEditing ? (
                            <input autoFocus onChange={(event) => setEditingValues({...editingValues, text: event.target.value})} className={`flex w-[84%] mt-2 rounded-sm bg-[#464646]`} value={editingValues.text} placeholder="Card Text..." type="text" />
                        ) : null}

                        {!isEditing ? (
                            <button onClick={() => setIsCardOpened(!isCardOpened)} className={`flex w-[84%] mt-2 cursor-pointer`} type="button">{text}</button>
                        ) : null}

                        {/* card icon */}
                        {isCardOpened && !isEditing ? (
                            <button onClick={() => setIsEditing(true)} className="flex absolute top-0 right-3 mt-2.5 text-[1.35rem] cursor-pointer">
                                <AiFillEdit />
                            </button>
                        ) : null}
                        
                        {isCardOpened && isEditing ? (
                            <button onClick={() => setIsEditing(false)} className="flex absolute top-0 right-3 mt-2.5 text-lg cursor-pointer">
                                <TfiClose />
                            </button>
                        ) : null}

                        <AnimatePresence>
                            {isCardOpened && !isEditing ? (
                                <motion.div initial={{height: "0"}} animate={{height: "11rem"}} exit={{height: "0"}}>
                                    <motion.p initial={{opacity: "0"}} animate={{opacity: "100%"}} exit={{opacity: "0"}} className="flex mt-2">{description}</motion.p>
                                </motion.div>
                            ) : null}
                            
                            {isEditing ? (
                                <motion.div initial={{height: "0"}} animate={{height: "11rem"}} exit={{height: "0"}}>
                                    <textarea onChange={(event) => setEditingValues({...editingValues, description: event.target.value})} placeholder="Description (optional)..." className="w-[98%] h-[75%] mt-2 bg-[#464646] resize-none rounded-sm" value={editingValues.description} />
                                    <div className="flex justify-between mb-1.5">
                                        <div className="flex h-6 items-end self-start">
                                            <button onClick={() => setEditingValues({...editingValues, color: "FFFFFF"})} className="w-4 h-4 mr-1 rounded-sm bg-[#FFFFFF]" type="button"></button>
                                            <button onClick={() => setEditingValues({...editingValues, color: "78D7FF"})} className="w-4 h-4 mr-1 rounded-sm bg-[#78D7FF]" type="button"></button>
                                            <button onClick={() => setEditingValues({...editingValues, color: "78FF9E"})} className="w-4 h-4 mr-1 rounded-sm bg-[#78FF9E]" type="button"></button>
                                            <button onClick={() => setEditingValues({...editingValues, color: "FFA978"})} className="w-4 h-4 mr-1 rounded-sm bg-[#FFA978]" type="button"></button>
                                            <button onClick={() => setEditingValues({...editingValues, color: "F478FF"})} className="w-4 h-4 mr-1 rounded-sm bg-[#F478FF]" type="button"></button>
                                        </div>
                                        <button onClick={() => changeCardValues()} className={`mr-2 px-2 rounded-md text-black bg-[#${isEditing ? editingValues.color :  color}] hover:opacity-70`} type="button">submit</button>
                                    </div>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>

                    <div style={{width: isCardOpened ? "0" : "auto"}} {...provided.dragHandleProps} className="text-2xl absolute right-2.5 flex">
                        <AnimatePresence>
                            {isHoveringCard ? (
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    className="flex items-center h-7 mt-[.4rem] w-full rounded-sm bg-white bg-opacity-0 hover:bg-opacity-20"
                                >
                                    <RxDragHandleDots2 />
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </Draggable>
    )
}