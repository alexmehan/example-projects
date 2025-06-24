import { useState } from "react";
import { images } from "./images";

export default function MemoryGame() {
    const [gameCards, setGameCards] = useState(() => {
        let cardArray = [...images, ...images]
        let card1
        let card2 
        for (let x = 0; x < cardArray.length; x++) {
            card1 = Math.floor(Math.random() * cardArray.length)
            card2 = Math.floor(Math.random() * cardArray.length)
            console.log(card1 + " " + card2)
            let temp = cardArray[card1]
            cardArray[card1] = cardArray[card2]
            cardArray[card2] = temp
            //[cardArray[card1], cardArray[card2]] = [cardArray[card2], cardArray[card1]]
        }
        return cardArray
        
    })
    console.log(gameCards)
    let cards = []
    for (let x = 0; x < 12; x++) {
        cards.push(
            <div key={x} className="bg-gray-500 w-[250px] h-[250px] mx-auto"></div>
        )
    }
    return (
        <section className="py-8 border-b border-black">
            <h2 className="font-extrabold text-4xl mb-4 text-center">Memory Game</h2>

            <div className="game-board grid grid-cols-4 gap-4 justify-center">
                {cards}
            </div>
        </section>
    )
}