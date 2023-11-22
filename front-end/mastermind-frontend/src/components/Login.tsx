import { useContext, useState,ReactElement,ChangeEvent } from 'react';
import { AuthContext } from '../assets/UserContext';
import { Link, useNavigate } from "react-router-dom";

const Login = ():ReactElement => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const login = authContext.login
    const user = authContext.user
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
        login(username, password);
        console.log(user)
        navigate("/board");
        setUsername("");
        setPassword("");
      };
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label
                htmlFor="username"
                className="block mb-2 text-sm md:text-2xl"
                >
                Username
                </label>
                <input
                className="text-gray-950"
                onChange={handleUsernameChange}
                type="username"
                value={username === null ? "" : username}
                />
            </div>
            <div>
                  <div className="mb-2">
                    <label htmlFor="password" className="text-sm md:text-2xl">
                      Password
                    </label>
                  </div>
                  <input
                    className="text-gray-950"
                    onChange={handlePasswordChange}
                    placeholder="*********"
                    type="password"
                    value={password === null ? "" : password}
                  />
            </div>
            <button>submit</button>
        </form>
    </div>
  )
}

export default Login
