export function applyDiscount(price: number, discount: number) {
  if (!discount) return price;

  const newPrice = price - price * (discount / 100);

  return newPrice;
}
