import { Draggable } from "react-beautiful-dnd"

export default function Item({ text, id, draggableIndex }) {
    return (
        <Draggable draggableId={id} index={draggableIndex}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex items-center bg-[#4F4F4F] w-full h-10 mb-2 rounded-[.25rem]"
                    >
                    <div className="w-2 h-full rounded-tl-[.25rem] rounded-bl-[.25rem] bg-[#78FF9E]"></div>
                    <p className="pl-1">{text}</p>
                </div>
            )}
        </Draggable>
    )
}