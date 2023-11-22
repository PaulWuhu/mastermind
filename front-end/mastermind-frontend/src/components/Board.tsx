import React from "react";
import { useState,useContext } from "react";
import Result from "./result";
import { AuthContext } from '../assets/UserContext';
import { Link } from "react-router-dom";
import { ScoreContext } from "../assets/ScoreContext";
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
  const userContext = useContext(AuthContext)
  const user = userContext?.user
  const token = user?.token.access
  const scoreContext = useContext(ScoreContext);
  const fetchScore = scoreContext!.fetchScore
  // console.log(token)
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
  const updateScore = async (result:string)=>{
    const data = { result: result };
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await fetch(`http://127.0.0.1:8000/user/api/score/${user?.user.username}/`,fetchConfig)
    }
    catch {
      console.log(Error);
    }
    fetchScore()
  }
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
    if (tryLeft != 0) {
      const newTry: pastTry = {
        pastTry: [temp],
        result: `You last try guessed ${correctNumber} correct number, and ${correctLocation} number location`,
      };
      setPastTry([...pastTry,newTry]);
      console.log(pastTry);
    } 
    // console.log(correctLocation)
    // console.log(formState)
  };
  if (correctLocation === 4) {
    if(token){
      updateScore("win")
    }
    setWin(true);
    setOpenM(true)
    console.log("win")
    setCorrectLocation(0)
    // call the endpoint to update user info
  }
  if(tryLeft === 0) {
    setWin(false);
    setOpenM(true)
    setTryLeft(10)
    if(token){
      updateScore("loss")
    }
    console.log("lose")
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: +value }));
  };
  return (
    <div>
      {token &&<p> Hello {user.user.username} </p>}
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
        <Link to={"/"}>Back to home page</Link>
    </div>
  );
};

export default Board;
