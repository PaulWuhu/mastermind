import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../assets/UserContext";
const Mainpage = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-blue-500 text-8xl font-bold py-8">MasterMind</h1>
      <h2 className="text-blue-500 text-4xl font-bold my-4">
        <Link to={"/rule"}>Check out the Rule Here</Link>
      </h2>
      <h2 className="text-blue-500 text-4xl font-bold my-4">
        <Link to={"/score"}>Check out the Score for all players Here!</Link>
      </h2>
      {!user && (
        <div className="text-blue-500 text-4xl font-bold my-4">
          <h2 >
            <Link to={"/login"}>Login Now!</Link>
          </h2>
          <h2 className="text-blue-500 text-4xl font-bold my-4">
            <Link to={"/signup"}>Sign Up Now!</Link>
          </h2>
        </div>
      )}
      <h2 className="text-blue-500 text-4xl font-bold my-4">
        <Link to={"/board"}>Go Play Now!</Link>
      </h2>
    </div>
  );
};

export default Mainpage;
