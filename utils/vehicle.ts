const uppercaseFirstLetter = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

export const formatVehicleName = (brandSlug: string, modelName: string): string => {
  const words = modelName.split(' ');

  const formattedWords = words.map((word) => {
    const isBMW = brandSlug === 'bmw'
    const hasNumbers = /\d/.test(word)
    if (hasNumbers && !isBMW) return word

    return uppercaseFirstLetter(word)
  });

  return formattedWords.join(' ');
}