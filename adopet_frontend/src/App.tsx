import { Fragment } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import User from "./components/User";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/user" element={<User />}></Route>
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
