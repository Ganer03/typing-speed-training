import React from 'react'
import './App.css'
import { InputField } from './components/inputField/InputField'
import { Stats } from './components/Stats'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Typing Speed Test</h1>
        <InputField />
        <Stats />
      </header>
    </div>
  )
}

export default App
