import Teste from "./pages/Teste";
import Theme from "./components/styles/Theme";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Theme>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Teste />}></Route>
          </Routes>
        </Router>
      </div>
    </Theme>
  );
}

export default App;
