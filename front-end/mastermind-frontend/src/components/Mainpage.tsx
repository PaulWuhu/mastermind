import Board from "./Board"
import {Link } from "react-router-dom";

const Mainpage = () => {

  return (
    <div>
    <h1>MasterMind</h1>
    <h2>
        <Link to={"/rule"}>Check out the Rule Here</Link>
    </h2>
    <h2>
        <Link to={"/score"}>Check out the Score for all player Here!</Link>
    </h2>
  <p>
    <Board/>
  </p>
  </div>
  )
}

export default Mainpage
