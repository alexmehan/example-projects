import { useState } from "react";
import { images } from "./images";

export default function MemoryGame() {
    const [turns, setTurns] = useState(0)
    const [gameCards, setGameCards] = useState(() => {
        let cardArray = [...images, ...images]
        for (let x = 0; x < cardArray.length; x++) {
            let card1 = Math.floor(Math.random() * cardArray.length)
            let card2 = Math.floor(Math.random() * cardArray.length)
            let temp = cardArray[card1]
            cardArray[card1] = cardArray[card2]
            cardArray[card2] = temp
            //[cardArray[card1], cardArray[card2]] = [cardArray[card2], cardArray[card1]]
        }
        const updatedCardArray = cardArray.map((card, index) => {

            const cardDetails = {
                id: index,
                image: card,
                flipped: false,
                matched: false
            }

            return cardDetails
        })
        return updatedCardArray
        
    })

    function handleClick(cardIndex) {
        const alreadyFlipped = gameCards.find(c => c.flipped && !c.matched)
        const flipped = gameCards.find((x, index) => index === cardIndex)
        const match = alreadyFlipped ? alreadyFlipped.image === flipped.image : false
        setGameCards(prev => prev.map((card, index) => {
            if (alreadyFlipped) {
                return match ? 
                    index === cardIndex || index === alreadyFlipped.id ? 
                    {...card, flipped: true, matched: true} : 
                    card
                :
                index === cardIndex || index === alreadyFlipped.id ? {...card, flipped: card} : card
            }
            else {
                return index === cardIndex ? {...card, flipped: !card.flipped} : card
            }

        
        }))
        setTurns(prev => prev + 1)
    }
    const cards = gameCards.map((card, index) => (
        <div className="w-[275px] h-[275px] mx-auto overflow-hidden">
            {card.flipped ? 
                <img src={card.image} className="object-cover w-full h-full" /> :
                <div key={index} onClick={() => handleClick(index)} className="bg-gray-500 w-full h-full"></div>
            }
        </div>
    ))
    return (
        <section className="py-8 border-b border-black">
            <h2 className="font-extrabold text-4xl mb-4 text-center">Memory Game</h2>
            <p>Turns: {turns}</p>
            <div className="game-board grid grid-cols-4 gap-4 justify-center">
                {cards}
            </div>
        </section>
    )
}

        