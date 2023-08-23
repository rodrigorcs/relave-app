import { useState } from 'react';

const LETTERS = /^[A-Za-z]$/;
const NUMBERS = /^[0-9]$/;

const isLetter = (char: string) => LETTERS.test(char);
const isNumber = (char: string) => NUMBERS.test(char);

export const useMaskedInput = (maskPattern: string, initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);

  const checkValidity = (maskedValue: string, pattern: string) => {
    const remainingPattern = pattern.substring(maskedValue.length);
    return !remainingPattern.includes('L') && !remainingPattern.includes('N');
  };

  const applyMask = (inputValue: string, pattern: string) => {
    let maskedValue = '';
    let inputIndex = 0;
    let tempMaskChars = '';

    for (let i = 0; i < pattern.length && inputIndex < inputValue.length; i++) {
      const maskChar = pattern[i];
      const inputChar = inputValue[inputIndex];

      switch (maskChar) {
        case 'L':
          if (isLetter(inputChar)) {
            maskedValue += tempMaskChars + inputChar;
            tempMaskChars = '';
            inputIndex++;
          }
          break;
        case 'N':
          if (isNumber(inputChar)) {
            maskedValue += tempMaskChars + inputChar;
            tempMaskChars = '';
            inputIndex++;
          }
          break;
        default:
          tempMaskChars += maskChar;
          if (maskChar === inputChar) {
            inputIndex++;
          }
          break;
      }
    }

    return maskedValue;
  };

  const handleInputChange = (text: string) => {
    const maskedInput = applyMask(text, maskPattern);
    setValue(maskedInput);
    setIsValid(checkValidity(maskedInput, maskPattern));
  };

  return [value, handleInputChange, isValid] as const
};