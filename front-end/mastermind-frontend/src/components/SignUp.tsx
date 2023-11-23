import { useContext, useState, ReactElement, ChangeEvent } from "react";
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
    <div className="rounded-md">
      <form onSubmit={(e) => handleSubmit(e)} className="px-44 py-10">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Sign Up Now!
            </h2>

            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    name="username"
                    id="username"
                    onChange={handleUserNameChange}
                    autoComplete="username"
                    value={username === null ? "" : username}
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="password">Password</label>
                <div className="mt-2">
                  <div>
                    <input
                      placeholder="******"
                      onChange={handlePasswordChange}
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
