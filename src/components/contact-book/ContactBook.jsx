import { useState } from "react"
import { contactData } from "./contacts"
import ContactCard from "./ContactCard"

export default function ContactBook() {
    const [contacts, setContacts] = useState(contactData)
    const [currentlyEditing, setCurrentlyEditing] = useState(null)
    const [name, setName] = useState("")

    function addContact(formData) {
        setContacts(prev => 
            [...prev, {id: Date.now(), name: name, city: formData.get("city")}]
        )
    }

    function handleChange() {
        setName()
    }

    const contactElements = contacts.map((contact) => (
        <ContactCard 
            key={contact.id}
            id={contact.id}
            name={contact.name}
            city={contact.city}
            currentlyEditing={currentlyEditing}
            setCurrentlyEditing={setCurrentlyEditing}
            setContacts={setContacts} //would naming the setContacts prop as update be fine?
        />
    ))
    return (
        <section className="py-8 border-b border-black">
            <h2 className="font-extrabold text-4xl mb-4 text-center">Contact Book</h2>
            <form action={addContact} className="my-8 flex gap-4 justify-center items-center">
                <input type="text" name="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} className="border px-3 py-2" />
                <input type="text" name="city" placeholder="Enter City" className="border px-3 py-2" />
                <button disabled={name === ""} className="text-white bg-indigo-500 px-3 py-2 disabled:opacity-50 hover:not-disabled:bg-indigo-700 cursor-pointer">Add Contact</button>
            </form>
            <div className="grid grid-cols-3 gap-8">
                {contactElements}
            </div>
        </section>
    )
}