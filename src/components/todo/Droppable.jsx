import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export default function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    backgroundColor: isOver ? 'red' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} className={`h-[300px] flex-1 p-4 flex flex-col gap-4 rounded-lg shadow-[0_0px_15px_rgba(0,0,0,0.25)] ${isOver ? "bg-gray-300" : "bg-gray-100"}`}>
        <h3 className="text-2xl font-bold text-center text-indigo-500">{props.title}</h3>
        {props.children}
    </div>
  );
}

{/* <div ref={setNodeRef} style={style}>
      
    </div> */}