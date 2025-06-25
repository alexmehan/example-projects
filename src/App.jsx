import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/counter/Counter'
import CompoundCalculator from './components/compound-calculator/CompoundCalculator'
import Die from './components/yahtzee/Die'

import PublicHolidays from './components/public-holidays/PublicHolidays'
import Accordion from './components/accordion/Accordion'
import { accordionData } from './components/accordion/accordion-data'
import ToDo from './components/todo/ToDo'
import MemoryGame from './components/memory-game/MemoryGame'
import HackerNews from './components/hacker-news/HackerNews'

function App() {
  const [count, setCount] = useState(0)

  console.log(accordionData)

  return (
    <>
      <h1>Example Apps</h1>
      <Counter />
      {/* <CompoundCalculator />
      <Die /> */}
      <PublicHolidays />
      <Accordion items={accordionData}/>
      <ToDo />
      <MemoryGame />
      <HackerNews />
    </>
  )
}

export default App
