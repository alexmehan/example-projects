import { useState, useEffect } from "react"
import { DndContext } from "@dnd-kit/core"
import { useDroppable } from "@dnd-kit/core"

import Draggable from './Draggable'
import Droppable from './Droppable'
import Delete from "./Delete"

export default function ToDo() {
    const [toDoItems, setToDoItems] = useState(() => {
        const items = JSON.parse(localStorage.getItem('toDoItems'))
        return items ? items : []
    })
    const [parent, setParent] = useState(null);
    const droppableContainers = [
        {
            id: "todo",
            title: "To Do",
        },
        {
            id: "inprogress",
            title: "In Progress",
        },
        {
            id: "done",
            title: "Done",
        },
    ]
    
    useEffect(() => {
        localStorage.setItem('toDoItems', JSON.stringify(toDoItems))
    }, [toDoItems])

    function updateToDo(formData) {
        const item = formData.get('todo')
        setToDoItems(prev => 
            [...prev, {id: Date.now(), text: item, status: "todo"}])
    }

    function handleCheck(itemId) {
        setToDoItems(prev => prev.map((item) => (
            item.id === itemId ? {...item, status: "done"} : item
        )))
    }

    function draggableMarkup(item) {
        return <Draggable key={item.id} id={item.id}>{item.text}</Draggable>
    }

    function handleDragEnd(event) {
        const {over, active} = event
        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        over.id === "delete" ? 
        setToDoItems(prev => prev.filter(item => active.id !== item.id ))
        :
        setToDoItems(prev => prev.map((item) => (
            active.id === item.id ? {...item, status: over.id} : item
        )))
    }

    const toDoList = toDoItems.map(item => (
        <li>
            <input type="checkbox" className="mr-3" checked={item.done} onChange={() => handleCheck(item.id)}></input>
            {item.text}
        </li>
    ))

    console.log(toDoItems)

    const containers = droppableContainers.map((container) => {
        const toDos = toDoItems.filter((i) => i.status === container.id)
        return (
            <Droppable key={container.id} id={container.id} title={container.title}>
                {
                    toDos.map((item) => (
                        draggableMarkup(item)
                    ))
                }
            </Droppable>
        )
    })
    return(
        <section className="py-8 border-b border-black w-full">
            <h2 className="font-extrabold text-4xl mb-4 text-center">ToDo & Saving to Local Storage</h2>
            <form action={updateToDo} className="mb-4">
                <input type="text" name="todo" className="border mr-4 px-3 py-2"></input>
                <button className="bg-gray-200 px-3 py-2">Add</button>
            </form>
            <ul>
                {toDoList}
            </ul>
            
            <DndContext onDragEnd={handleDragEnd}>
                <div className="flex items-stretch w-full gap-36 mb-8">
                    {containers}
                </div>
                <div className="">
                    <Delete />
                </div>
            </DndContext>
            
        </section>
    )
}