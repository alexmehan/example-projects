import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export default function Delete(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: "delete",
  });
  const style = {
    backgroundColor: isOver ? 'red' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} className={`w-full border-4 border-red-400 rounded-lg py-4 text-center font-bold ${isOver ? "bg-red-400 text-white" : "text-red-400"}`}>
        Delete
    </div>
  );
}

{/* <div ref={setNodeRef} style={style}>
      
    </div> */}


