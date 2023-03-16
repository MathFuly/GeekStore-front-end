import { Inventory } from "./../domain/models/Inventory";
import { applyDiscount } from "./applyDiscount";
import { formatPrice } from "./formatPrice";
export function handleKartPrice(
  inventory: Inventory[] | undefined,
  kartSize: string,
  quantity: number
) {
  if (!inventory || !kartSize || !quantity) return;

  const filterInventory = inventory.find((inv) => inv.size == kartSize);

  const applyQuantity =
    applyDiscount(
      Number(filterInventory?.price),
      Number(filterInventory?.discount)
    ) * quantity;

  const price = formatPrice(applyQuantity);

  return price;
}
