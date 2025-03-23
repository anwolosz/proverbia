import {React, useState, useEffect} from 'react';
import CharInput from './CharInput';
import { validLetters } from './utils/characters';

function ProverbInput({proverb, onProverbChange, onWin}) {
    const [inputs, setInputs] = useState(proverb.split("").map((char) => !validLetters.includes(char) ? char : "" ));
    const [valids, setValids] = useState(proverb.split("").map((char) => !validLetters.includes(char) ? true : false ));

    const handleInputChange = (index, value) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = value.toUpperCase();
        setInputs(updatedInputs);
        focusNextInput(index)
    };

    const focusNextInput = (index) => { 
        let nextId = index + 1
        console.log(inputs[nextId])
        while (valids[nextId]){
            nextId++
        }
        focusInput(nextId)
    }

    const focusPreviousInput = (index) => {
        let nextId = index - 1
        console.log(inputs[nextId])
        while (valids[nextId]){
            nextId--
        }
        focusInput(nextId)

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
            case "Enter":
              validateInput();
              break;
            default:
              return;
          }
        };
      
        document.addEventListener("keydown", handleKeyDown);
      
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [valids, proverb, inputs]);
      

    const validateInput = () => {
        if (inputs.includes(""))
        {
            return
        }
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
        focusNextInput(-1);
    }

    const checkWin = (updatedValids) => {
        if (!updatedValids.includes(false))
        {
            onWin()
        }
    }

  return (
    <>
    <p>{JSON.stringify(valids)}</p>
    <p>{JSON.stringify(inputs)}</p>
        <div>
            <div className="row d-flex justify-content-center">
        {proverb.split('').map((item, index) => {
            if (item === ' ') {
                return <hr className="opacity-0 m-1"></hr>;
                } else {
                    return (

                        <CharInput
                            id={index}
                            validChar={item}
                            key={index}
                            onChange={(value, id) => handleInputChange(index, value)}
                            valid={valids[index]}
                            char={item}
                            />
                        );
                    }
                })}
                </div>
        </div>
        <div className="d-flex justify-content-center">
            <button
            className='btn btn-primary m-3'
            onClick={validateInput}
            disabled={inputs.includes("")}>Check!</button>
        </div>
    </>
  );
}

export default ProverbInput;
