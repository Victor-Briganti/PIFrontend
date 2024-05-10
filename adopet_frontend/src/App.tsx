import Home from "./pages/Home";
import Donation from "./pages/Donation";
import About from "./pages/About";
import Theme from "./components/styles/Theme";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Theme>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/donation" element={<Donation />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </Router>
      </div>
    </Theme>
  );
}

export default App;
