import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../assets/UserContext";
const Mainpage = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  return (
    <div>
      <h1>MasterMind</h1>
      <h2>
        <Link to={"/rule"}>Check out the Rule Here</Link>
      </h2>
      <h2>
        <Link to={"/score"}>Check out the Score for all player Here!</Link>
      </h2>
      { !user &&
      <div>
        <h2>
          <Link to={"/login"}>Login Now!</Link>
        </h2>
        <h2>
          <Link to={"/signup"}>Sign Up Now!</Link>
        </h2>
      </div>}
      <h2>
        <Link to={"/board"}>Go Play Now!</Link>
      </h2>

    </div>
  );
};

export default Mainpage;
