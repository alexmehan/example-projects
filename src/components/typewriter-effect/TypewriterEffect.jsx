import { useState, useEffect } from "react";

export default function TypewriterEffect() {
    const [sentence, setSentence] = useState("")
    const [typewriter, setTypewriter] = useState("")
    const [characterIndex, setCharacterIndex] = useState(0)

    useEffect(() => {
        let interval
        if (sentence) {
            if (characterIndex >= sentence.length) return
            interval = setInterval(() => {
                setTypewriter(prev => prev + sentence.charAt(characterIndex))
                setCharacterIndex(prev => prev + 1)
            }, 500)
        }
        return () => { clearInterval(interval)}
    }, [characterIndex, sentence])

    function handleSubmit(formData) {
        setSentence(formData.get("sentence"))
        setCharacterIndex(0)
        setTypewriter("")
    }

    return (
        <section className="py-8 border-b border-black">
            <h2 className="font-extrabold text-4xl mb-4 text-center">Typewriter Effect</h2>
            <form action={handleSubmit} className="my-8 flex gap-4 justify-center items-center">
                <input type="text" name="sentence" placeholder="Enter Sentence" className="border px-3 py-2" />
                <button  className="text-white bg-indigo-500 px-3 py-2 disabled:opacity-50 hover:not-disabled:bg-indigo-700 cursor-pointer">Display Typewriter Effect</button>
            </form>
            {typewriter && <p>You typed: {typewriter}</p>}
        </section>
    )
}