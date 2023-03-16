import { formatPrice } from "./formatPrice";

export function applyInstallments(price: string | undefined, installment: number) {
  if(!price) return  
  
  const formated = price.replace("R$", "").replace(",", ".");

  const newPrice = Number(formated) / installment;

  return formatPrice(newPrice);
}
