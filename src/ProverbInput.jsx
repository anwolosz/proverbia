import {React, useState, useEffect} from 'react';
import CharInput from './CharInput';
import { validLetters } from './utils/characters';

function ProverbInput({proverb, onProverbChange, onWin}) {
    const [inputs, setInputs] = useState(proverb.split("").map(() => ""));
    const [valids, setValids] = useState(proverb.split("").map((char) => !validLetters.includes(char) ? true : false ));

    const handleInputChange = (index, value, id) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = value.toUpperCase();
        setInputs(updatedInputs);
        focusNextInput(id)
        console.log(id)
        console.log(inputs)
        console.log(index, value, id)
    };

    const focusNextInput = (id) => {
        focusInput(id+1)
    }

    const focusPreviousInput = (id) => {
        focusInput(id-1)
    }

    const focusInput = (id) => {
        requestAnimationFrame(() => {
            const element = document.getElementById((id).toString());
            if (element)
            {
                element.focus();
            }
        });
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
          const id = parseInt(document.activeElement.id);
      
          switch (event.key) {
            case "ArrowRight":
            case " ":
              focusNextInput(id);
              break;
            case "ArrowLeft":
            case "Backspace":
              focusPreviousInput(id);
              break;
            default:
              return;
          }
        };
      
        document.addEventListener("keydown", handleKeyDown);
      
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, []);
      

    const validateInput = () => {
        const updatedValids = [...valids];
        let updatedProverb = "";
        for (let i = 0; i<proverb.length; i++)
        {
            if (proverb[i] === inputs[i]) {
                updatedValids[i] = true
            }
            else {
                updatedProverb += proverb[i]
            }
        }
        setValids(updatedValids)
        onProverbChange(updatedProverb);
        checkWin(updatedValids)
    }

    const checkWin = (updatedValids) => {
        if (!updatedValids.includes(false))
        {
            onWin()
        }
    }


    let idCounter = 0;
  return (
    <>
    <p>{JSON.stringify(valids)}</p>
    <p>{JSON.stringify(inputs)}</p>
        <div className='d-flex'>
        {proverb.split('').map((item, index) => {
            if (item === ' ') {
                return <div key={index} style={{ width: '30px' }} />;
                } else {
                    return (
                        <CharInput
                            id={validLetters.includes(item) ? idCounter++ : null}
                            validChar={item}
                            key={index}
                            onChange={(value, id) => handleInputChange(index, value, id)}
                            valid={valids[index]}
                            char={item}
                        />
                    );
                }
            })}
        </div>
        <button className='btn btn-primary' onClick={validateInput} >Check!</button>
    </>
  );
}

export default ProverbInput;
