import RegisterUser from "./components/RegisterUser";
import RegisterAnimal from "./components/RegisterAnimal";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import Delete from "./components/Delete";
import Home from "./components/Home";
import About from "./components/About";
import Animals from "./components/AnimalGrid";
import AnimalDetail from "./components/AnimalDetail";
import Theme from "./components/Theme";
import AnimalImageUpload from "./components/AnimalImageUpload";
import Donation from "./components/Donation";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Theme>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/registeruser" element={<RegisterUser />}></Route>
            <Route path="/registeranimal" element={<RegisterAnimal />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/changepassword" element={<ChangePassword />}></Route>
            <Route path="/delete" element={<Delete />}></Route>
            <Route path="/animals" element={<Animals />}></Route>
            <Route path="/animaldetail" element={<AnimalDetail />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/animalupload" element={<AnimalImageUpload />}></Route>
             <Route path="/donation" element={<Donation />} />
          </Routes>
        </Router>
      </div>
    </Theme>
  );
}

export default App;
