import { Fragment, useState } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Router> 
        <Fragment>
        <Routes> // Switch
          <Route path="/login" element={<Login />}>
            </Route>
          <Route path="/register" element={<Register />}>
          </Route>
        </Routes>
        </Fragment>
      </Router>
    </div>
  )
}

export default App
