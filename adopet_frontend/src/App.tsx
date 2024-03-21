import { useState } from 'react'
import SignUp from './components/SignUp'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <SignUp />
      </header>
    </div>
  )
}

export default App
