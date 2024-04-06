import RegisterUser from "./components/RegisterUser";
import RegisterAnimal from "./components/RegisterAnimal";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import Delete from "./components/Delete";
import Home from "./components/Home";
import About from "./components/About";
import Animals from "./components/AnimalGrid";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Theme from "./components/Theme";

function App() {
  return (
    <Theme>
      <div className="App">
        <Router>
          <Routes>
            {" "}
            // Switch
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register_user" element={<RegisterUser />}></Route>
            <Route path="/register_animal" element={<RegisterAnimal />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/changepassword" element={<ChangePassword />}></Route>
            <Route path="/delete" element={<Delete />}></Route>
            <Route path="/animals" element={<Animals />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </Router>
      </div>
    </Theme>
  );
}

export default App;
