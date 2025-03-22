import {React, useState} from 'react';

function CharInput({validChar, onChange, valid}) {
    const [inputValue, setInputValue] = useState("");

  return (
        <input
        maxLength={1}
        className={`form-control text-center ${valid ? "bg-success": "bg-white"}`}
        style={{width: "50px"}}
        onChange={(e) => {
            setInputValue(e.target.value.toUpperCase())
            onChange(e.target.value.toUpperCase())
        }}
        value={inputValue}
        readOnly={valid}
        disabled={valid}
        />
  );
}

export default CharInput;
