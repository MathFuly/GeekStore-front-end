import { Kart } from "../domain/models/Kart";

export function getKartFullPrice(kart: Kart[] | undefined) {
  if (!kart?.length) return;

  const allPrice = kart.map((k) => k.price * k.quantity);

  const fullPrice = allPrice.reduce(
    (acc: number, value: number) => acc + value
  );

  return fullPrice;
}
