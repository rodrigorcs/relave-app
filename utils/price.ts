export const getDisplayPrice = (priceInCents: number) => {
  return `R$${priceInCents / 100}`
}