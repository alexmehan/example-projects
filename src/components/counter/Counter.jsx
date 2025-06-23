import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";

export default function Counter() {
   const [index, setIndex] = useState(0);

   function handleAdd(e) {
      e.preventDefault();
      setIndex(index + 1);
   }

   function handleSubtract(e) {
      e.preventDefault();
      if (index > 0) {
         setIndex(index - 1);
      }
   }

   return (
      <div id="counter">
         <h2>Counter</h2>
         <button name="add" onClick={handleAdd}> + </button>
         <span class="counter">{index}</span>
         <button name="subtract" onClick={handleSubtract}> - </button>
      </div>
   )
}