import {React, useState} from 'react';
import { specialCharacters, validLetters } from './utils/characters';

function CharInput({char, onChange, valid}) {
    const [inputValue, setInputValue] = useState("");

  return (
        <input
        maxLength={1}
        className={`form-control text-center fw-bold
            ${specialCharacters.includes(char) ? "bg-secondary-subtle": ""}
            ${valid ? "bg-success": ""}`}
        style={{width: "50px"}}
        onKeyDown={(e) => {
            const inputSymbol = e.key.toUpperCase()
            if (validLetters.includes(inputSymbol)) { // Only allow printable characters
                setInputValue(inputSymbol);
                onChange(inputSymbol);
            }
            e.preventDefault(); // Prevent default input behavior
        }}
        value={specialCharacters.includes(char) ? char : inputValue}
        readOnly={valid || specialCharacters.includes(char)}
        disabled={valid || specialCharacters.includes(char)}
        />
  );
}

export default CharInput;
