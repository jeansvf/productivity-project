import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { RxDragHandleDots2, RxEyeClosed } from "react-icons/rx"
import { AiFillEdit, AiOutlineClose } from "react-icons/ai"
import {  } from "react-icons/bs"
import { TfiClose } from "react-icons/tfi"

export default function Item({ text, description, id, color, draggableIndex }) {
    const [isHoveringCard, setIsHoveringCard] = useState(false)
    const [isCardOpened, setIsCardOpened] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    return (
        <Draggable draggableId={id} index={draggableIndex}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`relative flex items-start bg-[#4F4F4F] w-full min-h-[2.5rem] mb-2 rounded-[.25rem]`}
                    onMouseOver={() => setIsHoveringCard(true)} onMouseOut={() => setIsHoveringCard(false)}
                >
                    <div className={`w-1.5 absolute left-0 top-0 h-full rounded-tl-[.25rem] rounded-bl-[.25rem] bg-[#${color}]`}></div>

                    <div className="flex flex-col w-full pl-3">
                        {isEditing ? (
                            <input onChange={() => false} className={`flex w-[84%] mt-2 rounded-sm bg-[#464646]`} value={text} type="text" />
                        ) : null}

                        {!isEditing ? (
                            <button onClick={() => setIsCardOpened(!isCardOpened)} className={`flex w-[84%] mt-2 cursor-pointer`} type="button">{text}</button>
                        ) : null}

                        {isCardOpened && !isEditing ? (
                            <button onClick={() => setIsEditing(true)} className="flex absolute top-0 right-3 mt-2.5 text-[1.35rem] cursor-pointer">
                                <AiFillEdit />
                            </button>
                        ) : null}
                        
                        {isCardOpened && isEditing ? (
                            <motion.button initial={{opacity: "0"}} animate={{opacity: "100%"}} exit={{opacity: "0"}} onClick={() => setIsEditing(false)} className="flex absolute top-0 right-3 mt-2.5 text-xl cursor-pointer">
                                <TfiClose />
                            </motion.button>
                        ) : null}

                        <AnimatePresence>
                            {isCardOpened && !isEditing ? (
                                <motion.div initial={{height: "0"}} animate={{height: "11rem"}} exit={{height: "0"}}>
                                    <motion.p initial={{opacity: "0"}} animate={{opacity: "100%"}} exit={{opacity: "0"}} className="flex mt-2">{description}</motion.p>
                                </motion.div>
                            ) : null}
                            
                            {isEditing ? (
                                <motion.div initial={{height: "0"}} animate={{height: "11rem"}} exit={{height: "0"}}>
                                    <textarea onChange={(event) => false} placeholder="Description (optional)..." className="w-[98%] h-[75%] mt-2 bg-[#464646] resize-none rounded-sm" value={description} />
                                    <div className="flex justify-between mb-1.5">
                                        <div className="flex h-6 items-end self-start">
                                            <button className="w-4 h-4 mr-1 rounded-sm bg-[#FFFFFF]" type="button"></button>
                                            <button className="w-4 h-4 mr-1 rounded-sm bg-[#78D7FF]" type="button"></button>
                                            <button className="w-4 h-4 mr-1 rounded-sm bg-[#78FF9E]" type="button"></button>
                                            <button className="w-4 h-4 mr-1 rounded-sm bg-[#FFA978]" type="button"></button>
                                            <button className="w-4 h-4 mr-1 rounded-sm bg-[#F478FF]" type="button"></button>
                                        </div>
                                        <button onClick={() => setIsEditing(false)} className={`mr-2 px-2 rounded-md text-black bg-[#${color}] hover:opacity-70`} type="button">submit</button>
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