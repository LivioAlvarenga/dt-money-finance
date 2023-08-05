export const priceFormatter = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const dateFormatter = (date: string) => {
  if (!date) {
    return ''
  }
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export const textTitleFormatter = (text: string) => {
  if (!text) {
    return ''
  }
  return text.charAt(0).toUpperCase() + text.slice(1)
}
