import React from 'react';
import { validLetters } from './utils/characters';

function LetterInfo({proverb}) {
    const countLetters = (proverb) => {
        const letterCount = []
    
        const lowerCaseString = proverb;
        for (const char of lowerCaseString)
        {
            if (validLetters.includes(char))
            {
                const existingLetter = letterCount.find(letter => Object.keys(letter)[0] === char);
                if (!existingLetter) {
                    const newLetter = {};
                    newLetter[char] = 1;
                    letterCount.push(newLetter);
                } else {
                    existingLetter[char]++;
                }
            }
        }
        letterCount.sort((a, b) => {
            const keyA = Object.keys(a)[0];
            const keyB = Object.keys(b)[0];
            return validLetters.indexOf(keyA) - validLetters.indexOf(keyB);
        });
        return letterCount;
    };
  return (
    <div className="row g-4">
        {countLetters(proverb).map((letterObj, index) => {
            const key = Object.keys(letterObj)[0];
            return (
                <div className='col-lg-1 col-md-4 col-sm-12' key={index}>
                    <div className='card'>
                            <div className='fw-bold p-0 bg-light text-center card-header'>
                                {key}
                            </div>
                            <div className='p-1 text-center '>
                                {letterObj[key]}
                            </div>
                    </div>
                </div>
            );
        })}
    </div>
  );
}

export default LetterInfo;
