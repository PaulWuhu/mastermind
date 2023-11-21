import React from 'react'
import { useState } from 'react'
const Board = () => {
  const [target,setTarget] = useState<number[]>([0,0,0,0])
  const fetchNumber = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/api/get_random_numbers');
      const jsonData = await response.json();
      setTarget(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(target)
  return (
    <button onClick={fetchNumber}> play </button>
  )
}

export default Board
