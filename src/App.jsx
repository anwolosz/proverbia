import { useState, useEffect } from 'react'
import './App.css'
import LetterInfo from './LetterInfo';
import ProverbInput from './ProverbInput';

function App() {
  const [proverb, setProverb] = useState("SZÍNHÁZ, AZ EGÉSZ VILÁG")
  const [proverbRemaining, setProverbRemaining] = useState(proverb)
  const [isWin, setIsWin] = useState(false)

  const handleProverbChange = (updatedProverb) => {
    setProverbRemaining(updatedProverb);
  };

  const handleWin = () => {
    setIsWin(true);
  };

  return (
    <>
    <p>{proverbRemaining}</p>
      <div className='container'>
        <ProverbInput proverb={proverb} onProverbChange={handleProverbChange} onWin={handleWin}/>
        <LetterInfo proverb={proverbRemaining}/>
        <p>Helo {JSON.stringify(isWin)} {isWin ? "WIN": "NOWIN"}</p>
      </div>
    </>
  )
}

export default App
