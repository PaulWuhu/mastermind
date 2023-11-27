import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ScoreContext } from "../assets/ScoreContext";
const Score = () => {
  const scoreContext = useContext(ScoreContext);
  const scores = scoreContext?.scores;
  const fetchScore = scoreContext!.fetchScore;
  useEffect(() => {
    fetchScore();
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-5xl font-semibold mb-4">
        Here are the scores for all players!
      </h1>
      {!scores?.length && (
        <div className="text-gray-700">
          <p className="text-2xl font-semibold">
            There is no active player now
          </p>
          <p className="text-2xl font-semibold">
            Create a new account to play the game!
          </p>
        </div>
      )}
      <table className="w-full border-collapse border border-gray-300 my-10">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-4 px-5 text-xl border">User Name</th>
            <th className="py-4 px-5 text-xl border">User Win</th>
            <th className="py-4 px-5 text-xl border">User Loss</th>
          </tr>
        </thead>
        <tbody>
          {scores &&
            scores.map((score) => (
              <tr key={score.username} className="border-t">
                <th className="py-2 px-4 border">{score.username}</th>
                <td className="py-2 px-4 border">
                  {score.win} <span className="text-green-500">win</span>
                </td>
                <td className="py-2 px-4 border">
                  {score.loss} <span className="text-red-500">loss</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link
        to={"/"}
        className="text-blue-500 text-2xl font-bold hover:underline"
      >
        Back to home page
      </Link>
    </div>
  );
};

export default Score;
