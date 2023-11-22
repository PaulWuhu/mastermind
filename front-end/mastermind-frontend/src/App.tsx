import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rule from "./components/Rule"
import Mainpage from "./components/Mainpage";
import Scores from "./components/Score";
import Notfound from "./components/Notfound";
import Board from "./components/Board";
import Login from "./components/Login";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rule" element={<Rule />} />
        <Route path="/score" element={<Scores/>}/>
        <Route path="/board" element={<Board/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Mainpage/>}/>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
