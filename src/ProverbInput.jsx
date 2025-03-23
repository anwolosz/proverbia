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
        console.log("focusPreviousInput1", index)
        console.log("focusPreviousInput2", valids[index])
        console.log("focusPreviousInput3", valids.slice(0, index))
        console.log("focusPreviousInput4", valids.slice(0, index).every(val => val === true))

        if (valids[index] === false && valids.slice(0, index).every(val => val === true))
        {
            focusInput(index)
            return
        }
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
        //   proverbRemaining(proverb)
      
          switch (event.key) {
            case "ArrowRight":
            case " ":
              focusNextInput(id);
              break;
            case "ArrowLeft":
            case "Backspace":
                console.log("BACKSPACE1")
                focusPreviousInput(id);
                console.log("BACKSPACE2")
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
        for (let i = 0; i<inputs.length; i++)
        {
            if (proverb[i] === inputs[i]) {
                updatedValids[i] = true
            }
        }
        proverbRemaining(proverb)
        console.log(updatedProverb)
        setValids(updatedValids)
        checkWin(updatedValids)
        focusNextInput(-1);
    }

    const proverbRemaining = (proverb) => {
        let updatedProverb = proverb;

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].length > 0 && validLetters.includes(inputs[i])) {
                updatedProverb = updatedProverb.replace(inputs[i], ''); // Removes only the first occurrence
            }
        }
            console.log("HELLO", updatedProverb)
        onProverbChange(updatedProverb);
    }

    const checkWin = (updatedValids) => {
        if (!updatedValids.includes(false))
        {
            onWin()
        }
    }

  return (
    <>
    {/* <p>{JSON.stringify(valids)}</p>
    <p>{JSON.stringify(inputs)}</p> */}
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
