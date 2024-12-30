import React from 'react';

interface TodoProps {
    lists: {
        name: string;
    },
    handleNick: () => void;
}

const Todo: React.FC<TodoProps> = ({ lists, handleNick }) => {
  return (
    <div onClick={handleNick}>{lists.name}</div>
  )
}

export default Todo