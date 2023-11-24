/// <reference types="vite/client" />

type UserData = {
    username: string;
    win?:number;
    lose?: number;
    password?:string;
}

type scores = {
    username: string;
    win:number;
    loss: number;
}

type pastTry = {
    pastTry: number[];
    correctLocation: number;
    correctNumber: number;
  };
  interface FormState {
    number1: number;
    number2: number;
    number3: number;
    number4: number;
  }
