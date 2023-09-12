export const getDisplayPrice = (priceInCents: number, addSpace = false) => {
  return `R$${addSpace ? ' ' : ''}${priceInCents / 100}`
}