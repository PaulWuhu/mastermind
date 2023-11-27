import { AuthContext } from "../assets/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const Delete = () => {
  const userContext = useContext(AuthContext);
  const user = userContext?.user;
  const token = user?.token.access;
  const setUser = userContext.setUser;
  const navigate = useNavigate();
  const logOut = () => {
    setUser(null);
    navigate("/");
  };
  const deleteUser = async (): Promise<void> => {
    const fetchConfig = {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await fetch(
        `http://127.0.0.1:8000/user/api/get_user/${user?.user.username}/`,
        fetchConfig
      );
    } catch {
      console.log(Error);
    }
    setUser(null);
    navigate("/");
  };
  return (
    <div>
      <button onClick={logOut}>Log Out</button>
      <button onClick={deleteUser}>Delete my account</button>
    </div>
  );
};

export default Delete;
