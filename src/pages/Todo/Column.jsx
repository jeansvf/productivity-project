import { IoIosAdd } from "react-icons/io";
import Item from "./Item";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function Column({ columnId, columnIndex, droppableColumnId, title, tasks }) {
    return (
        <Draggable draggableId={columnId} index={columnIndex}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex flex-col items-center w-80 h-64 my-3 mx-2 bg-[#2E2E2E] rounded-[.4rem]"
                >
                    <h2
                    {...provided.dragHandleProps}
                    className="w-[90%] py-4 font-semibold text-[17px]">{title}</h2>
        
                    <Droppable droppableId={droppableColumnId} /* CHECK THIS */ type="task" >
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="flex flex-col items-center w-[92%]"
                            >
                                {tasks.map((item, draggableIndex) => (
                                    item == undefined ? null : <Item text={item?.text} id={item?.id} draggableIndex={draggableIndex} key={item?.id} />
                                ))}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <button className="flex w-[92%] pt-1 pb-3 items-center"><IoIosAdd className="text-2xl" /> Add Task</button>
                </div>
            )}
        </Draggable>
    )
}