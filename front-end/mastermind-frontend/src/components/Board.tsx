import React, { useEffect } from 'react'
import { useState } from 'react'
type pastTry = {
  pastTry: number[],
  result : string
}

const Board = () => {
  const [target,setTarget] = useState<number[]>([0,0,0,0])
  const [correctNumber , setCorrectNumber] = useState(0)
  const [correctLocation , setCorrectLocation] = useState(0)
  const [formState, setFormState] = useState<number[]>([]);
  const [pastTry , setPastTry] = useState<pastTry|null>(null)
  const [tryLeft,setTryLeft] = useState<number>(10)
  const fetchNumber = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/api/get_random_numbers');
      const jsonData = await response.json();
      setTarget(jsonData);
      console.log(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setTryLeft((tryLeft) => tryLeft - 1)
    for(let i =0; i<4; i++){
      // console.log(typeof(target[i]),"target of i")
      // console.log(typeof(formState[i]),"form of i")
      if(Number(target[i])===Number(formState[i])){
        setCorrectLocation((correctLocation) => correctLocation+1)
      }
      if(formState.includes(Number(target[i]))){
        setCorrectLocation((correctNumber) => correctNumber+1)
      }
    }
    
    // console.log(correctLocation)
    // console.log(formState)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value)
    setFormState((prevState:number[]) => ([...prevState,value]));
  };
  return (
    <div>
      <p>your try left: {tryLeft}</p>
      <form onSubmit={handleSubmit}>
      <label>
        Number 1:
        <input type="number" min="0" max="7" name="number1" onChange={handleChange} />
      </label>
      <br />
      <label>
        Number 2:
        <input type="number" min="0" max="7" name="number2" onChange={handleChange} />
      </label>
      <br />
      <label>
        Number 3:
        <input type="number" min="0" max="7" name="number3" onChange={handleChange} />
      </label>
      <br />
      <label>
        Number 4:
        <input type="number" min="0" max="7" name="number4" onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    <div>Your past Try:{pastTry} </div>
    <button onClick={fetchNumber}> play </button>
    </div>
  )
}

export default Board
