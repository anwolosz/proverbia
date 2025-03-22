import {React, useState} from 'react';
import CharInput from './CharInput';

function ProverbInput({proverb, onProverbChange}) {
    const [inputs, setInputs] = useState(proverb.split("").map(() => ""));
    const [valids, setValids] = useState(proverb.split("").map(() => false));

    const handleInputChange = (index, value) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = value.toUpperCase();
        setInputs(updatedInputs);
        console.log(inputs)
    };

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
    }

  return (
    <>
        <div className='d-flex'>
        {proverb.split('').map((item, index) => {
            if (item === ' ') {
                return <div key={index} style={{ width: '30px' }} />;
                } else {
                    return <CharInput
                        validChar={item}
                        key={index}
                        onChange={(value) => handleInputChange(index, value)}
                        valid={valids[index]}
                        char={item}/>
                }
            })}
        </div>
        <button className='btn btn-primary' onClick={validateInput} >Check!</button>
    </>
  );
}

export default ProverbInput;
