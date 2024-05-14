import Home from "./pages/Home";
import Donation from "./pages/Donation";
import About from "./pages/About";
import Login from "./pages/Login";
import AnimalRegister from "./pages/AnimalRegister";
import UserRegister from "./pages/UserRegister";
import AddressRegister from "./pages/AddressRegister";
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
            <Route path="/login" element={<Login />}></Route>
            <Route path="/animalregister" element={<AnimalRegister />}></Route>
            <Route path="/userregister" element={<UserRegister />}></Route>
            <Route
              path="/addressregister"
              element={<AddressRegister />}
            ></Route>
          </Routes>
        </Router>
      </div>
    </Theme>
  );
}

export default App;
