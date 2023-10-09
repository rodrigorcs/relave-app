import { applyMask, removeMask } from '../utils/mask'
import { useState } from 'react'

export const useMaskedInput = (maskPattern: string, initialValue = '') => {
  const [maskedValue, setMaskedValue] = useState(initialValue)
  const [unmaskedValue, setUnmaskedValue] = useState(initialValue)
  const [isValid, setIsValid] = useState(false)

  const checkValidity = (maskedValue: string, pattern: string) => {
    const remainingPattern = pattern.substring(maskedValue.length)
    return !remainingPattern.includes('L') && !remainingPattern.includes('N')
  }

  const handleInputChange = (text: string) => {
    const maskedInput = applyMask(text, maskPattern)
    const unmaskedInput = removeMask(text)
    setMaskedValue(maskedInput)
    setUnmaskedValue(unmaskedInput)
    setIsValid(checkValidity(maskedInput, maskPattern))
  }

  return [maskedValue, unmaskedValue, handleInputChange, isValid] as const
}
