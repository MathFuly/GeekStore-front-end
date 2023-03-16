import { Inventory } from "../domain/models/Inventory";

export function compareInventory(
  inventory: Inventory[] | undefined,
  size: string,
  quantity: number
) {
  if (!inventory) return;

  const compare = inventory.filter((inv) => inv.size == size);

  const isIncrementable = compare.some(
    (inv) => quantity + 1 <= inv.current_inventory
  );

  return isIncrementable;
}
