import React, { useEffect } from "react";
import { useState } from "react";
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
  const [pastTry, setPastTry] = useState<pastTry[]>();
  const [tryLeft, setTryLeft] = useState<number>(10);
  const [win, setWin] = useState<boolean | null>(null);
  const fetchNumber = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/user/api/get_random_numbers"
      );
      const jsonData = await response.json();
      setTarget(jsonData);
      console.log(jsonData)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(pastTry);
    setTryLeft((tryLeft) => tryLeft - 1);
    const temp: number[] = [];
    for (let i in formState) {
      temp.push(formState[i]);
    }
    console.log(temp)
    for (let i = 0; i < 4; i++) {
      // console.log(target[i])
      // console.log(temp[i])
      if (Number(target[i]) === Number(temp[i])) {
        setCorrectLocation((correctLocation) => correctLocation + 1);
      }
      if (temp.includes(Number(target[i]))) {
        setCorrectNumber((correctNumber) => correctNumber + 1);
      }
    }
    if (correctLocation === 4) {
      setWin(true);
      console.log("win")
      // call the endpoint to update user info
    } else if (tryLeft != 0) {
      const newTry: pastTry = {
        pastTry: [temp],
        // things to work on
        result: `You last try guessed ${correctNumber} correct number, and ${correctLocation} number location`,
      };
      const tries = pastTry;
      tries?.push(newTry);
      if (pastTry !== undefined) {
        setPastTry([...pastTry, newTry]);
      } else {
        setPastTry([newTry]);
      }
      // console.log(pastTry);
    } if(tryLeft === 1) {
      setWin(false);
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
      <button onClick={fetchNumber}> {win} play </button>
      
    </div>
  );
};

export default Board;
