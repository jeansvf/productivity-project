import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Item from './Item';
import { IoIosAdd } from 'react-icons/io';
import Column from './Column';
import { useState } from 'react';

export default function Todo() {
    const [columns, setColumns] = useState([
        { id: '1', droppableColumnId: 'droppableColumn-1', title: 'Todo', tasks: [
            { id: '4', text: '1' },
            { id: '5', text: '2' },
            { id: '6', text: '3' },
        ] },
        { id: '2', droppableColumnId: 'droppableColumn-2', title: 'Doing', tasks: [] },
        { id: '3', droppableColumnId: 'droppableColumn-3', title: 'Done', tasks: [] },
    ])
        
    const handleOnDragEnd = (result) => {
        if (result.destination == null) {
            return
        }

        if (result.type == 'column') {
            // clone columns state
            let newColumns = structuredClone(columns)
            
            let selectedColumn = newColumns[result.source?.index]
            
            // update newColumns
            newColumns.splice(result.source.index, 1)
            newColumns.splice(result.destination.index, 0, selectedColumn)
            
            // update columns state with newColumns
            setColumns(newColumns)

            return
        }

        if (result.type == 'task') {

            // clone columns state
            let newColumns = structuredClone(columns)
            
            let sourceColumnIndex
            columns.map((column, columnIndex) => column.droppableColumnId == result.source.droppableId ? sourceColumnIndex = columnIndex : null)
            
            let destinationColumnIndex
            columns.map((column, columnIndex) => column.droppableColumnId == result.destination.droppableId ? destinationColumnIndex = columnIndex : null)
            
            let selectedTask = newColumns[sourceColumnIndex].tasks[result.source?.index]
                
            // delete task that was moved
            if (newColumns[sourceColumnIndex].droppableColumnId == result.source.droppableId) {
                newColumns[sourceColumnIndex].tasks.splice(result.source.index, 1)
            }
            
            // add task to new position
            if (newColumns[destinationColumnIndex].droppableColumnId == result.destination.droppableId) {
                newColumns[destinationColumnIndex].tasks.splice(result.destination.index, 0, selectedTask)
            }
    
            // update columns state with newColumns
            setColumns(newColumns)

            return
        }
    }

    return (
      <main className='flex pl-2 pt-20 w-full h-screen bg-[#393939] text-white z-10'>
            <div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='main' direction='horizontal' type='column'>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className='flex flex-wrap'
                            >
                                {columns.map((column, columnIndex) => (
                                    <Column columnId={column.id} columnIndex={columnIndex} droppableColumnId={column.droppableColumnId} tasks={column.tasks} title={column.title} key={column.id} />
                                ))}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
      </main>
    )
}