import React, { useEffect } from "react";
import { useState } from "react";
import Result from "./result";
type pastTry = {
  pastTry: number[];
  result: string;
};
interface FormState {
  number1: number;
  number2: number;
  number3: number;
  number4: number;
}

const Board = () => {
  const [target, setTarget] = useState<number[]>([0, 0, 0, 0]);
  const [correctNumber, setCorrectNumber] = useState(0);
  const [correctLocation, setCorrectLocation] = useState(0);
  const [formState, setFormState] = useState<FormState>({
    number1: 0,
    number2: 0,
    number3: 0,
    number4: 0,
  });
  const [pastTry, setPastTry] = useState<pastTry[]>([]);
  const [tryLeft, setTryLeft] = useState<number>(10);
  const [win, setWin] = useState<boolean | null>(null);
  const [openM,setOpenM] = useState(false)
  const fetchNumber = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/user/api/get_random_numbers"
      );
      const jsonData = await response.json();
      setTarget(jsonData);
      setCorrectLocation(0)
      setCorrectNumber(0)
      setFormState({
        number1: 0,
        number2: 0,
        number3: 0,
        number4: 0,
      })
      setPastTry([])
      setTryLeft(10)
      console.log(jsonData)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(pastTry);
    setTryLeft((tryLeft) => tryLeft - 1);
    setCorrectLocation(0)
    setCorrectNumber(0)
    const temp: number[] = [];
    for (let i in formState) {
      temp.push(formState[i]);
    }
    console.log(temp)
    temp.forEach((num, i) => {
      if (Number(target[i]) === num) {
        setCorrectLocation((prevCorrectLocation) => prevCorrectLocation + 1);
      }
      if (temp.includes(Number(target[i]))) {
        setCorrectNumber((prevCorrectNumber) => prevCorrectNumber + 1);
      }
    });
    // had a bug where state update was slow, switch to for each instead of C for loop solve the bug somehow
    if (correctLocation === 4) {
      setWin(true);
      setOpenM(true)
      console.log("win")
      // call the endpoint to update user info
    } else if (tryLeft != 0) {
      const newTry: pastTry = {
        pastTry: [temp],
        result: `You last try guessed ${correctNumber} correct number, and ${correctLocation} number location`,
      };
      setPastTry([...pastTry,newTry]);
      console.log(pastTry);
    } if(tryLeft === 1) {
      setWin(false);
      setOpenM(true)
      console.log("lose")
    }
    // console.log(correctLocation)
    // console.log(formState)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: +value }));
  };
  return (
    <div>
      <p>your try left: {tryLeft}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Number 1:
          <input
            type="number"
            min="0"
            max="7"
            name="number1"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Number 2:
          <input
            type="number"
            min="0"
            max="7"
            name="number2"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Number 3:
          <input
            type="number"
            min="0"
            max="7"
            name="number3"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Number 4:
          <input
            type="number"
            min="0"
            max="7"
            name="number4"
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        Your past Try:
        {pastTry?.map((item, index) => (
          <div key={index}>
            <p>{`Your combination is ${item.pastTry}`}</p>
            <p>{item.result}</p>
          </div>
        ))}
      </div>
      <button onClick={fetchNumber}>Start a New Game </button>
        <Result win = {win} setWin={setWin} fetchNumber={fetchNumber} openM={openM} setOpenM={setOpenM}/>
    </div>
  );
};

export default Board;
