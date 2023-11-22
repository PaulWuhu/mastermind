import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ScoreContext } from '../assets/ScoreContext';
const Score = () => {
    const scoreContext = useContext(ScoreContext);
    const scores =scoreContext?.scores
    const fetchScore = scoreContext!.fetchScore
    // no idea how to fix this yet
    useEffect(() => {
      fetchScore();
    }, []);
  return (
    <div>
        <h1>Here are the scores for all players!</h1>
        {!scores?.length && (
        <div>
          There is no active player now
          <div>Create a new account to play the game!</div>
        </div>
      )}
        <table>
        <thead >
            <tr>
              <th >
                User Name
              </th>
              <th>
                User Win
              </th>
              <th>
                User lose
              </th>
            </tr>
          </thead>
          <tbody>

      {scores &&
          scores.map((score:scores) => (
              <tr key={score.username}>
                <th>{score.username}</th>
                <td>
                  {score.win}<span> win</span>
                </td>
                <td>
                {score.loss}<span> loss</span>
                </td>
            </tr>
          ))}
          </tbody>
          </table>
          <Link to={"/"}>Back to home page</Link>
    </div>
  )
}

export default Score
