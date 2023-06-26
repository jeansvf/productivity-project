import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Item from './Item';
import { IoIosAdd } from 'react-icons/io';
import Column from './Column';
import { useState } from 'react';

export default function Todo() {
    // const [columns, setColumns] = useState([
    //   { id: '1', title: 'Todo', key: 11},
    //   { id: '2', title: 'Doing', key: 22},
    //   { id: '3', title: 'Done', key: 33},
    // ])
        
    // const handleOnDragEnd = (result) => {
    //   let columnSource = structuredClone(columns)
    //   let draggedItem = {}

    //   for (let i in columnSource) {
    //     if(columnSource[i].id == result.draggableId) {
    //       draggedItem = columnSource[i]
    //     }
    //   }

    //   if (result.type == "column") {

    //     console.log("dragged item: ", draggedItem);
    //     console.log("source :", result.source);
    //     console.log("destination :", result.destination);
    //     console.log("result :", result);

    //     const newColumns = structuredClone(columns)
    //     newColumns.splice(result.source.index, 1)
    //     newColumns.splice(result.destination.index, 0, draggedItem)
        
    //     setColumns(newColumns)
    //     console.log(columns);
    //     return
    //   }
    // }

    return (
      <main className='flex w-full h-screen items-center justify-center bg-[#393939] z-10'>
        not finished yet
      </main>
    //   <DragDropContext onDragEnd={handleOnDragEnd}>
    //     <Droppable type="column" droppableId='all-columns' direction='horizontal'>
    //       {(provided) => (
    //         <main 
    //           {...provided.droppableProps}
    //           ref={provided.innerRef}
    //           className='flex w-full h-screen items-center justify-center'
    //         >
    //           {columns.map((column, index) => (
    //             <Column columnId={column.id} index={index} title={column.title} key={crypto.randomUUID()} />
    //             ))}
    //           {provided.placeholder}
    //         </main>
    //       )}
    //     </Droppable>
    //   </DragDropContext>
    )
}