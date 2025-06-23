import { useState } from "react"

export default function AccordionSingle({items}) {
    const [openIndex, setOpenIndex] = useState(false)

    function handleToggle(index) {
        setOpenIndex(prev => (prev === index ? null : index))
    }

    return (
        <div className="accordion pt-10 w-[50rem] m-auto">
            <h3 className="font-bold text-2xl mb-4 text-indigo-500">Accordion Single</h3>
            {
                items.map((item, index) => {
                const isOpen = index === openIndex
                return (
                    
                    <div className={
                        `accordion-item border-b border-gray-400 group relative ${isOpen ? "open" : ""}
                        after:content-[''] hover:after:border-b-3 hover:after:border-gray-400
                        after:absolute after:bottom-0 after:left-0 after:w-full
                        `
                    }>
                        <div className="accordion-title py-6 relative flex justify-between align-middle cursor-pointer" onClick={() => handleToggle(index)}>
                            <h4 className="text-xl font-bold">{item.title}</h4>
                            <span className="
                                text-indigo-500 text-[32px] font-bold leading-[20px] w-[24px] h-[24px] absolute right-0 text-center
                                after:content-['+'] after:opacity-100 after:w-full after:h-full after:block after:origin-center
                                after:transition-[transform,opacity] after:duration-[300ms,200ms]
                                group-[.open]:after:rotate-z-180 group-[.open]:after:opacity-0"
                            ></span>
                            <span className="
                                text-indigo-500 text-[32px] font-bold leading-[20px] w-[24px] h-[24px] absolute right-0 text-center
                                after:opacity-0 after:content-['-'] after:w-full after:h-full after:block after:origin-center
                                after:transition-[transform,opacity] after:duration-[300ms,200ms]
                                group-[.open]:after:rotate-z-180 group-[.open]:after:opacity-100"></span>
                        </div>
                        <div className={`accordion-content pb-4 ${isOpen ? "" : "hidden"}`}>
                            {item.content}
                        </div>
                    </div>
                )})
            }
        </div>
    )
}