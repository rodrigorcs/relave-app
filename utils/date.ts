export const addLeadingZeros = (number: number, totalLength: number) => {
  return number.toString().padStart(totalLength, '0');
}