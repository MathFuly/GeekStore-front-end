export function formatPrice(price: number) {
  if (!price) return;

  const newPrice = `R$${price.toFixed(2).toString().replace(".", ",")}`;

  return newPrice;
}
