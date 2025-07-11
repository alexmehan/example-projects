import { useState } from "react"
import { contactData } from "./contacts"
import ContactCard from "./ContactCard"

export default function ContactBook() {
    const [contacts, setContacts] = useState(contactData)
    const [currentlyEditing, setCurrentlyEditing] = useState(null)

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
            <div className="grid grid-cols-3">
                {contactElements}
            </div>
        </section>
    )
}