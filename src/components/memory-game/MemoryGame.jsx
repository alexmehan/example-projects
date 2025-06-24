import { useState } from "react";
import { images } from "./images";

export default function MemoryGame() {
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
        const updatedCardArray = cardArray.map((card) => {

            const cardDetails = {
                image: card,
                flipped: false,
                matched: false
            }

            return cardDetails
        })
        return updatedCardArray
        
    })

    function handleClick(cardIndex) {
        setGameCards(prev => prev.map((card, index) => (
            index === cardIndex ? {...card, flipped: !card.flipped} : card
        )))
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

            <div className="game-board grid grid-cols-4 gap-4 justify-center">
                {cards}
            </div>
        </section>
    )
}