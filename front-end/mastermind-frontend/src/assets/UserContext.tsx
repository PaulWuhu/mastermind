import React,{ createContext, useState, Dispatch,SetStateAction,ReactNode } from 'react';

interface RegistrationData {
    username: string;
    password: string;
  }


export type AuthContextType = {
    user: string | null;
    setuser: Dispatch<SetStateAction<string | null>>;
    login: Promise<void>;
    logout: ()=> null;
    signUp:Promise<void>
  };

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => null,
    login: async () => {},
    logout: () => null,
    signUp:()=>{}
  });

  interface AuthProviderProps {
    children: ReactNode;
  }


  export const AuthProvider = (props: AuthProviderProps) => {
    const [user, setUser] = useState<string | null>(null);
    const login =async(username:string, password:string)=>{
       const url = "http://127.0.0.1:8000/user/api/login/"
       const data = {
        "username":username,
        "password":password
    }
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",}
          };
        try {
        const response = await fetch(url,fetchConfig);
        if(response.ok){
            const jsonData = await response.json()
            setUser(jsonData)
            console.log(User)
        }
        }
        catch{
            console.log(Error)
        }
    }
    const logout = () => {
        setUser(null)
        return null
    }

    const signUp = async (
        userData: RegistrationData,
        method = "POST"
      ) => {
        fetch("http://127.0.0.1:8000/user/api/user/signup/", {
          method: method,
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(() => login(userData.username, userData.password))
          .catch(console.error);
      };

    const { children } = props;
  
    return (
      <AuthContext.Provider value={{ user, setUser, login, logout,signUp }}>
        {children}
      </AuthContext.Provider>
    );
  };
