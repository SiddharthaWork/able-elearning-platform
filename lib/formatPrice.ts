export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("NPR", {
    style: "currency",
    currency: "NPR",
  }).format(price)
}

// ne-NP