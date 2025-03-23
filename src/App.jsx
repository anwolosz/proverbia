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
    <h1 className='text-center display-3 p-5'>Proverbia</h1>
    {/* <p>{proverbRemaining}</p> */}
      <div className='container'>
        <ProverbInput proverb={proverb} onProverbChange={handleProverbChange} onWin={handleWin}/>
        <LetterInfo proverb={proverbRemaining}/>
        {
          isWin ? 
          <div class="alert alert-success" role="alert">
            Gratulálunk! Tippek száma:
          </div>
          : ""
        }
      </div>
    </>
  )
}

export default App
