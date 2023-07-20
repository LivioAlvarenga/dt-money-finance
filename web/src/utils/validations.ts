// Function to parse price
export function parsePrice(price: string): number | null {
  // verify if price is a valid format
  const isValidFormat = /^\d+([,]\d+)?$/.test(price)

  if (!isValidFormat) {
    return null
  }

  try {
    // Substitui a vírgula por um ponto e tenta converter para número
    const parsedPrice = Number(price.replace(',', '.'))

    if (isNaN(parsedPrice)) {
      return null
    }

    return parsedPrice
  } catch {
    return null
  }
}
