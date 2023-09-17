import { useRef } from "react";
import { getRandomBetween } from "../utils/random";

export const generateSkeletonArray = (length: number): number[] => {
  return Array.from({ length }, () => getRandomBetween(0.7, 1));
}

export const useSkeletonArray = (length: number) => {
  const randomValuesRef = useRef(generateSkeletonArray(length));
  return randomValuesRef.current;
}