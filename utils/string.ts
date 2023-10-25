export const truncateText = (text: string, charsLimit: number) => {
  if (text.length <= charsLimit) return text;

  const truncatedText = text.slice(0, charsLimit);

  const lastWordMatch = truncatedText.match(/.*\b(\w)\W/);
  if (!lastWordMatch?.index) return `${truncatedText}...`;

  const lastWordPosition = lastWordMatch.index + lastWordMatch[0].length - 1;
  return `${truncatedText.slice(0, lastWordPosition)}...`;
}