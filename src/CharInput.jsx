import {React, useState} from 'react';
import { specialCharacters } from './utils/characters';

function CharInput({char, onChange, valid}) {
    const [inputValue, setInputValue] = useState("");

  return (
        <input
        maxLength={1}
        className={`form-control text-center fw-bold
            ${specialCharacters.includes(char) ? "bg-secondary-subtle": ""}
            ${valid ? "bg-success": ""}`}
        style={{width: "50px"}}
        onChange={(e) => {
            setInputValue(e.target.value.toUpperCase())
            onChange(e.target.value.toUpperCase())
        }}
        value={specialCharacters.includes(char) ? char : inputValue}
        readOnly={valid || specialCharacters.includes(char)}
        disabled={valid || specialCharacters.includes(char)}
        />
  );
}

export default CharInput;
