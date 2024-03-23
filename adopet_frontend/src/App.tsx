import { Fragment, useState } from 'react'
import Register from './components/Register'
import SignIn from './components/SignIn'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Router> 
        <Fragment>
        <Routes> // Switch
          <Route path="/signin" element={<SignIn />}>
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
