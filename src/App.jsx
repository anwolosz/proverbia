import { useState, useEffect } from 'react'
import './App.css'
import LetterInfo from './LetterInfo';
import ProverbInput from './ProverbInput';

function App() {
  const [proverb, setProverb] = useState("SZÍNHÁZ, AZ EGÉSZ VILÁG?")
  const [proverbRemaining, setProverbRemaining] = useState(proverb)

  const handleProverbChange = (updatedProverb) => {
    setProverbRemaining(updatedProverb);
  };

  return (
    <>
      <div className='container'>
        <ProverbInput proverb={proverb} onProverbChange={handleProverbChange}/>
        <LetterInfo proverb={proverbRemaining}/>
      </div>
    </>
  )
}

export default App
