import { Fragment /*useState*/ } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import Home from "./components/Home";
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
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/changepassword" element={<ChangePassword />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
