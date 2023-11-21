import React from 'react'
import {Link } from "react-router-dom";

const Rule = () => {
  return (
    <div>
        <h1>Welcome to Play Mastermind!</h1>
        <h2>Here are the rule!</h2>
        <ul>
            <li>
            At the start of the game the We will randomly select a pattern of four different numbers from a total of 8 different numbers, from 0 to 7!
            </li>
            <li>
            A player will have 10 attempts to guess the number combinations
            </li>
            <li>
            At the end of each guess, We will provide some feedback!
            </li>
            <li>
                You can Sign Up with an account to make sure your score if kept, or play without an account!
            </li>
        </ul>
        <Link to={"/"}>Back to home page</Link>
    </div>
  )
}

export default Rule
