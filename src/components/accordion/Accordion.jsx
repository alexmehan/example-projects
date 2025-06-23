import { useState } from "react"
import Explanation from "../Explanation"
import AccordionSingle from "./AccordionSingle"
import AccordionMultiple from "./AccordionMultiple"

export default function Accordion({items}) {
    const [openIndex, setOpenIndex] = useState(false)

    function handleToggle(index) {
        setOpenIndex(prev => (prev === index ? null : index))
    }

    return (
        <section className="py-8 border-b border-black">
            <h2 className="font-extrabold text-4xl mb-4 text-center"> Accordion</h2>
            <Explanation>
                The accordion component below is based of the Github FAQ page. It uses useState, array mapping, event handlers and all styling is done with TailwindCSS
            </Explanation>
            <div className="flex gap-16">
                <AccordionSingle items={items}/>
                <AccordionMultiple items={items}/>
            </div>
        </section>
    )
}

//group-[.open]:opacity-100