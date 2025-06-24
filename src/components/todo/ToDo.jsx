import { useState, useEffect } from "react"

export default function ToDo() {
    const [toDoItems, setToDoItems] = useState(() => {
        const items = JSON.parse(localStorage.getItem('toDoItems'))
        return items ? items : []
    })

    useEffect(() => {
        localStorage.setItem('toDoItems', JSON.stringify(toDoItems))
    }, [toDoItems])

    function updateToDo(formData) {
        const item = formData.get('todo')
        setToDoItems(prev => 
            [...prev, {id: Date.now(), text: item, done: false}])
    }

    function handleCheck(itemId) {
        setToDoItems(prev => prev.map((item) => (
            item.id === itemId ? {...item, done: !item.done} : item
        )))
    }

    const toDoList = toDoItems.map(item => (
        <li>
            <input type="checkbox" className="mr-3" checked={item.done} onChange={() => handleCheck(item.id)}></input>
            {item.text}
        </li>
    ))
    return(
        <section className="py-8 border-b border-black">
            <h2 className="font-extrabold text-4xl mb-4 text-center">ToDo & Saving to Local Storage</h2>
            <form action={updateToDo} className="mb-4">
                <input type="text" name="todo" className="border mr-4 px-3 py-2"></input>
                <button className="bg-gray-200 px-3 py-2">Add</button>
            </form>
            <ul>
                {toDoList}
            </ul>
        </section>
    )
}