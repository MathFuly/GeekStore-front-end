import { Inventory } from "../domain/models/Inventory";
import { applyDiscount } from "./applyDiscount";
import { formatPrice } from "./formatPrice";

export function getCheaperPrice(inventory: Inventory[] | undefined) {
  if (!inventory) return;

  const findDiscount = inventory?.some((inv) => inv.discount > 0);

  if (!findDiscount)
    return {
      discount: false,
      price: formatPrice(Number(inventory[0]?.price)),
    };

  function comparePrice(prev: Inventory, current: Inventory) {
    const prevDiscount = applyDiscount(prev.price, prev.discount);
    const currentDiscount = applyDiscount(current.price, current.discount);

    if (prevDiscount < currentDiscount) {
      return prev;
    } else {
      return current;
    }
  }

  const cheap = inventory.reduce((prev, current) =>
    comparePrice(prev, current)
  );

  const bestPrice = formatPrice(applyDiscount(cheap.price, cheap.discount));

  return {
    discount: true,
    price: bestPrice,
    fullprice: formatPrice(Number(cheap.price)),
    discountValue: `${cheap.discount}%`,
  };
}
