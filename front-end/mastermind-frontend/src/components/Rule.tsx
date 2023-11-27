import { Link } from "react-router-dom";

const Rule = () => {
  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 shadow-md min-w-full min-h-full">
      <h1 className="text-5xl font-bold my-6">Welcome to Play Mastermind!</h1>
      <h2 className="text-4xl font-semibold pt-4">Here are the rules:</h2>
      <ul className="list-disc pl-6 my-10 text-3xl">
        <li className="mb-5">
          At the start of the game, we will randomly select a pattern of four
          different numbers from a total of 8 different numbers, from 0 to 7!
        </li>
        <li className="mb-5">
          A player will have 10 attempts to guess the number combinations and
          300 second to guess.
        </li>
        <li className="mb-5">
          At the end of each guess, we will provide some feedback.
        </li>
        <li className="mb-5">
          Try to guess the correct combinations before the attempts and time run
          out.
        </li>
        <li className="mb-5">
          You can Sign Up with an account to make sure your score is kept, or
          play without an account!
        </li>
      </ul>
      <Link to={"/"} className="text-blue-500 text-2xl font-bold ">
        Back to the home page
      </Link>
    </div>
  );
};

export default Rule;
