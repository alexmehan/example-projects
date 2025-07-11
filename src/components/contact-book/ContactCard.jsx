import { useState } from "react"

export default function ContactCard(props) {
    const [name, setName] = useState(props.name)
    const [city, setCity] = useState(props.city)
    
    function updateContact() {
        props.setContacts(prev => prev.map((contact) => (
            contact.id === props.id ? {...contact, name, city} : contact
        )))

        props.setCurrentlyEditing(null)
    }

    function handleEdit() {
        props.setCurrentlyEditing(props.id)
    }

    function handleClose() {
        setName(props.name)
        setCity(props.city)
        props.setCurrentlyEditing(false)
    }

    function handleDelete() {
        props.setContacts(prev => prev.filter((contact) => contact.id !== props.id))
    }

    return (
        <div className="shadow-md rounded-md p-8 border border-gray-300">
            
            {
                !props.currentlyEditing ? (
                    <>
                    <div className="flex flex-col flex-wrap">
                        <span className="text-lg font-bold">{props.name}</span>
                        <span>{props.city}</span>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-gray-200 px-3 py-2 mx-4" onClick={handleEdit}>Edit</button>
                    </div>
                    </>
                )
                : (
                    <>
                        <form id="contact-details" onSubmit={(e) => {e.preventDefault()
                            updateContact()
                        }}>
                            
                            <input type="text" name="name" placeholder="name" className="border mb-2 px-3 py-2 w-full" onChange={(e) => setName(e.target.value)} value={name}/>
                            <input type="text" name="city" placeholder="city" className="border mb-4 px-3 py-2 w-full" onChange={(e) => setCity(e.target.value)} value={city}/>
                        
                        <div className="flex justify-between">
                                <button type="button" className="px-3 py-2 bg-red-400" onClick={handleDelete}>Delete</button>
                            <div>
                                <button type="button" className="bg-gray-200 px-3 py-2 mx-4" onClick={handleClose}>Close</button>
                                <button type="submit" className="text-white bg-indigo-500 px-3 py-2" form="contact-details">Save</button>
                            </div>
                        </div>
                        </form>
                    </>
                )
            }
        </div>
    )
}


