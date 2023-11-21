import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rule from "./components/Rule"
import Mainpage from "./components/Mainpage";
import Scores from "./components/Score";
import Notfound from "./components/Notfound";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rule" element={<Rule />} />
        <Route path="/score" element={<Scores/>}/>
        <Route path="/" element={<Mainpage/>}/>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
