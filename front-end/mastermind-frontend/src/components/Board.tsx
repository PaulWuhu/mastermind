import React from "react";
import { useState, useContext } from "react";
import Result from "./result";
import { AuthContext } from "../assets/UserContext";
import { Link } from "react-router-dom";
import { ScoreContext } from "../assets/ScoreContext";
import Delete from "./Delete";

const Board = () => {
  const userContext = useContext(AuthContext);
  const user = userContext?.user;
  const token = user?.token.access;
  const scoreContext = useContext(ScoreContext);
  const fetchScore = scoreContext!.fetchScore;
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
  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
  }
  const [pastTry, setPastTry] = useState<pastTry[]>([]);
  const [tryLeft, setTryLeft] = useState<number>(10);
  const [win, setWin] = useState<boolean | null>(null);
  const [openM, setOpenM] = useState(false);
  const updateScore = async (result: string) => {
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
      await fetch(
        `http://127.0.0.1:8000/user/api/score/${user?.user.username}/`,
        fetchConfig
      );
    } catch {
      console.log(Error);
    }
    fetchScore();
  };
  const fetchNumber = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/user/api/get_random_numbers"
      );
      const jsonData = await response.json();
      setTarget(jsonData);
      setCorrectLocation(0);
      setCorrectNumber(0);
      setFormState({
        number1: 0,
        number2: 0,
        number3: 0,
        number4: 0,
      });
      setPastTry([]);
      setTryLeft(10);
      console.log(jsonData, "the answer");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(pastTry);
    setTryLeft((tryLeft) => tryLeft - 1);
    setCorrectLocation(0);
    setCorrectNumber(0);
    const temp: number[] = [];
    for (let i in formState) {
      temp.push(formState[i]);
    }
    let correctLocations = 0;
    let correctNumbers = 0;
    // console.log(temp)
    const checked:number[] = []
    for (let i = 0; i < 4; i++) {
      if (Number(target[i]) === temp[i]) {
        // console.log(target[i],"target")
        // console.log(temp[i],"temp")
        // console.log("this should appear on number location")
        setCorrectLocation((prevCorrectLocation) => prevCorrectLocation + 1);
        correctLocations++;
      }
      if (temp.includes(Number(target[i])) && !checked.includes(Number(target[i]))) {
        checked.push(temp[i])
        setCorrectNumber((prevCorrectNumber) => prevCorrectNumber + 1);  
        correctNumbers++;
      }
    }
    if (tryLeft != 0) {
      const newTry: pastTry = {
        pastTry: temp,
        correctLocation: correctLocations,
        correctNumber: correctNumbers,
      };
      setPastTry([...pastTry, newTry]);
      console.log(pastTry);
    }

  };
  if (correctLocation === 4) {
    if (token) {
      updateScore("win");
    }
    handleReset()
    setWin(true);
    setOpenM(true);
    console.log("win");
    setCorrectLocation(0);
  }
  if (tryLeft === 0) {
    setWin(false);
    setOpenM(true);
    setTryLeft(10);
    handleReset()
    if (token) {
      updateScore("loss");
    }
    console.log("lose");
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: +value }));
  };
  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-md shadow-md">
  {token && <p className="text-lg">Hello, {user.user.username}!</p>}
  <div className="flex">
    <div className="w-1/2 pr-4">
      <p className="text-4xl">Your tries left: {tryLeft}</p>
      <form onSubmit={handleSubmit} className="mt-4">
      <label className="block mb-2 text-sm md:text-lg">
      Number 1:
      <input
        className=" text-2xl text-gray-800 w-16 px-2 py-1 border rounded-md"
        type="number"
        min="0"
        max="7"
        name="number1"
        onChange={handleChange}
      />
    </label>
    <br />
    <label className="block mb-2 text-sm md:text-lg">
      Number 2:
      <input
        className=" text-2xl text-gray-800 w-16 px-2 py-1 border rounded-md"
        type="number"
        min="0"
        max="7"
        name="number2"
        onChange={handleChange}
      />
    </label>
    <br />
    <label className="block mb-2 text-sm md:text-lg">
      Number 3:
      <input
        className=" text-2xl text-gray-800 w-16 px-2 py-1 border rounded-md"
        type="number"
        min="0"
        max="7"
        name="number3"
        onChange={handleChange}
      />
    </label>
    <br />
    <label className="block mb-2 text-sm md:text-lg">
      Number 4:
      <input
        className=" text-2xl text-gray-800 w-16 px-2 py-1 border rounded-md"
        type="number"
        min="0"
        max="7"
        name="number4"
        onChange={handleChange}
      />
    </label>
    <br />
    <button
      type="submit"
      className="bg-blue-500 text-white text-xl px-4 py-2 rounded-md mt-4"
    >
      Submit
    </button>
      </form>
    </div>
    <div className="w-1/2">
      <div className="mt-4">
        <p className="text-lg">Your past Tries:</p>
        {pastTry?.map((item, index) => (
          <div key={index} className="mt-2">
            <p className="pb-1">Your combination is <span className="font-bold">{`${item.pastTry}`}</span></p>
            <p className="pb-1">You have <span className="font-bold" >{item.correctNumber} </span> correct number</p>
            <p className="">You have <span className="font-bold" >{item.correctLocation} </span>correct location</p>
          </div>
        ))}
      </div>
      <button
        onClick={fetchNumber}
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Start a New Game
      </button>
      <Result
        win={win}
        setWin={setWin}
        fetchNumber={fetchNumber}
        openM={openM}
        setOpenM={setOpenM}
      />
    </div>
  </div>
  <div className="mt-4">
    <Link to={"/"} className="text-blue-500 text-xl hover:underline">
      Back to Home Page
    </Link>
  </div>
  <h2 className="mt-4">
    <Link to={"/score"} className="text-blue-500 text-xl hover:underline">
      Check out the Scores for all Players Here!
    </Link>
  </h2>
  {!user && (
    <div className="mt-4">
      <h2 className="py-2">
        <Link to={"/login"} className="text-blue-500 text-xl hover:underline">
          Login Now!
        </Link>
      </h2>
      <h2 className="py-2" >
        <Link to={"/signup"} className="text-blue-500 text-xl hover:underline">
          Sign Up Now!
        </Link>
      </h2>
    </div>
  )}
   {user && <Delete/>}
</div>

  );
};

export default Board;
