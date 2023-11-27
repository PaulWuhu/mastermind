import { useContext, useState, ReactElement, ChangeEvent } from "react";
import { AuthContext } from "../assets/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Login = (): ReactElement => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const login = authContext.login;
  const user = authContext.user;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const element = event.currentTarget as HTMLInputElement;
    setUsername(element.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.currentTarget.value);
    // this is a good way
  };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
    login(username, password);
    }
    catch{
      console.log(Error)
    }   
    if(user?.token) {    
    navigate("/board");
    setUsername("");
    setPassword("");
  }
  else{
    alert("Opp, something went wrong")
    setUsername("");
    setPassword("");
  }
  };
  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 shadow-md">
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm md:text-6xl text-gray-700">Username</label>
            <input
                className="w-full px-4 py-3 border rounded-md text-lg text-gray-800"
                onChange={handleUsernameChange}
                type="username"
                placeholder="type your username here"
                value={username === null ? "" : username}
            />
        </div>
        <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm md:text-6xl text-gray-700">Password</label>
            <input
                className="w-full px-4 py-3 border rounded-md text-lg text-gray-800"
                onChange={handlePasswordChange}
                placeholder="*********"
                type="password"
                value={password === null ? "" : password}
            />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm md:text-3xl">Submit</button>
    </form>
    <p className="mt-4 text-gray-700">
        <Link to={"/signup"} className="text-blue-500 text-2xl font-bold">Sign Up Now!</Link>
    </p>
    <p className="my-4">
    <Link to={"/"} className="text-blue-500 text-2xl font-bold ">Back to the home page</Link></p>
</div>

  );
};

export default Login;
