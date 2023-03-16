import { Kart } from "../domain/models/Kart";
import { applyDiscount } from "./applyDiscount";

export function getKartDiscount(kart: Kart[] | undefined) {
  if (!kart) return;

  const filterKart = kart.filter((k) => k.discount > 0);
  if (!filterKart.length) return;

  const allDiscount = filterKart.map(
    (k) => k.price * (k.discount / 100) * k.quantity
  );

  const discountValue = allDiscount.reduce(
    (acc: number, value: number) => acc + value
  );

  return discountValue;
}
