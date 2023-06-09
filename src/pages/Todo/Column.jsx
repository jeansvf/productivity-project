import { IoIosAdd } from "react-icons/io";
import Item from "./Item";
import { Draggable } from "react-beautiful-dnd";

export default function Column({columnId, index, title}) {
    return (
        <Draggable draggableId={columnId} index={index} key={index} >
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="flex flex-col items-center w-80 h-64 bg-[#2E2E2E] rounded-[.4rem] mr-5"
                >
                    <h2 {...provided.dragHandleProps} className="w-[90%] py-4 font-semibold text-[17px]">{title}</h2>

                    <Item content="snap"/>
                    <Item content="salve"/>
                    <Item content="snap"/>
                    <button className="flex w-[92%] pt-1 pb-3 items-center"><IoIosAdd className="text-2xl" /> Add Task</button>
                </div>
            )}
        </Draggable>
    )
}