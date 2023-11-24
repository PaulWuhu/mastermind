import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type user = {
  token: {
    access: string;
    refresh: string;
  };
  user: {
    username: string;
    win: number;
    loss: number;
  };
};

export type AuthContextType = {
  user: user | null;
  setUser: Dispatch<SetStateAction<string | null>>;
  login: Promise<void>;
  logout: () => null;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => null,
  login: async () => {},
  logout: () => null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const login = async (username: string, password: string) => {
    const url = "http://127.0.0.1:8000/user/api/login/";
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
    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const jsonData = await response.json();
        setUser(jsonData);
        // console.log(user)
      }
    } catch {
      console.log(Error);
    }
  };
  const logout = () => {
    setUser(null);
    return null;
  };

  const { children } = props;

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
