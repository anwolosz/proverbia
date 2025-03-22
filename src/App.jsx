import { useState, useEffect } from 'react'
import './App.css'
import LetterInfo from './LetterInfo';

function App() {
  const [proverb, setProverb] = useState("SZÍNHÁZ AZ EGÉSZ VILÁG")

  return (
    <>
        <LetterInfo proverb={proverb}></LetterInfo>

    </>
  )
}

export default App
