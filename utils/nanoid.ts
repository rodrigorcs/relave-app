import { customAlphabet } from 'nanoid'

export const generateShortId = (length: number) => {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nanoid = customAlphabet(alphabet, length);

  return nanoid()
}
