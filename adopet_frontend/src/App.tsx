import Newlogin from "./views/Newlogin";
import "./App.css";
import Home from "./views/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Login" element={<Newlogin />}></Route>
          {/*<Route path="/" element={<Home />}></Route>*/}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
