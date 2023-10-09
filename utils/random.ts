export const getRandomBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}
