import Newlogin from "./pages/Newlogin";
import Test from "./pages/Test";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Login" element={<Newlogin />}></Route>
          <Route path="/test" element={<Test />}></Route>
          {/*<Route path="/" element={<Home />}></Route>*/}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
