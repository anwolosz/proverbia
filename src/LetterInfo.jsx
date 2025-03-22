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
    <div>
      <h1>LetterComponent</h1>
      <ul>
        {countLetters(proverb).map((letterObj, index) => {
            const key = Object.keys(letterObj)[0];
            return (
                <li key={index}>
                    {key}: {letterObj[key]}
                </li>
            );
        })}
        </ul>
    </div>
  );
}

export default LetterInfo;
