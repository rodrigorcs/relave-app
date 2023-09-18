export const getDisplayPrice = (priceInCents?: number, addSpace = false) => {
  if (!priceInCents && priceInCents !== 0) return '-'
  return `R$${addSpace ? ' ' : ''}${priceInCents / 100}`
}