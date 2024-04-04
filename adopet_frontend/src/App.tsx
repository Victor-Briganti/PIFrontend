import { Fragment /*useState*/ } from "react";
import RegisterUser from "./components/RegisterUser";
import RegisterAnimal from "./components/RegisterAnimal";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import Delete from "./components/Delete";
import Home from "./components/Home";
import Animals from "./components/AnimalGrid";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
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
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
