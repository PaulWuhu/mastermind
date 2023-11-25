import { useContext, useState, ChangeEvent } from "react";
import { AuthContext } from "../assets/UserContext";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useContext(AuthContext);
  const login = userContext.login;
  const navigate = useNavigate();
  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.currentTarget as HTMLInputElement;
    setUsername(element.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.currentTarget as HTMLInputElement;
    setPassword(element.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userSignUpUrl = "http://127.0.0.1:8000/user/api/user/signup/";
    const data = {
      username: username,
      password: password,
    };
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(userSignUpUrl, fetchConfig);
    if (response.ok) {
      navigate("/board");
      login(username, password);
    } else {
      return <div>Sorry something went wrong</div>;
    }
  };
  return (
<div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
  <form onSubmit={(e) => handleSubmit(e)} className="px-8 py-6">
    <h2 className="text-xl font-semibold mb-6 text-blue-900">Sign Up Now!</h2>

    <div className="mb-6">
      <label htmlFor="username" className="block text-sm font-medium text-blue-900">
        Username
      </label>
      <input
        name="username"
        id="username"
        onChange={handleUserNameChange}
        autoComplete="username"
        value={username === null ? "" : username}
        className="w-full mt-2 p-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>

    <div className="mb-6">
      <label htmlFor="password" className="block text-sm font-medium text-blue-900">
        Password
      </label>
      <input
        placeholder="******"
        onChange={handlePasswordChange}
        type="password"
        name="password"
        id="password"
        value={password}
        className="w-full mt-2 p-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>

    <div className="flex items-center justify-end">
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Sign up
      </button>
    </div>
  </form>
</div>
  );
};

export default SignUp;
