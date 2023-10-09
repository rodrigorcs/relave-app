import { getRandomBetween } from '../utils/random'
import { useRef } from 'react'

export const generateSkeletonArray = (length: number): number[] => {
  return Array.from({ length }, () => getRandomBetween(0.7, 1))
}

export const useSkeletonArray = (length: number) => {
  const randomValuesRef = useRef(generateSkeletonArray(length))
  return randomValuesRef.current
}
