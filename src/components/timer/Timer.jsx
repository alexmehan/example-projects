import { useState, useEffect } from "react"

export default function Timer() {
    const [timer, setTimer] = useState(300)
    const [isRunning, setIsRunning] = useState(false)
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60

    useEffect(() => {
        let interval
        if (isRunning) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        clearInterval(interval)
                        setIsRunning(false)
                    }
                    return prev - 1   
                })
            }, 1000)

            return () => { clearInterval(interval)}
        }
    }, [isRunning])

    function handleTimer() {
        timer === 0 ? resetTimer("start") : setIsRunning(prev => !prev)
    }

    function resetTimer(buttonPressed) {
        setTimer(300)
        buttonPressed === "reset" ? setIsRunning(false) : setIsRunning(true) 
    }

    return (
        <section className="py-8 border-y border-black">
            <p className="text-center text-4xl">{minutes + ":" + String(seconds).padStart(2, "0")}</p>
            <div className="flex gap-4 justify-center mt-12">
                <button className="bg-gray-200 px-3 py-2 bg-green-400 disabled:opacity-50" onClick={handleTimer} disabled={isRunning && timer > 0}>Start</button>
                <button className="bg-gray-200 px-3 py-2 bg-red-400 disabled:opacity-50" onClick={handleTimer} disabled={!isRunning}>Stop</button>
                <button className="bg-gray-200 px-3 py-2 disabled:opacity-50" onClick={() => resetTimer("reset")}>Reset</button>
            </div>
        </section>
    )
}