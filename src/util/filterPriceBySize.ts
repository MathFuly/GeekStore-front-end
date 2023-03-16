import { Inventory } from "./../domain/models/Inventory";

export function filterPriceBySize(
  inventory: Inventory[] | undefined,
  size: string
) {
  if (!inventory) return;

  const checkAvaliable = inventory.some(
    (inv) => inv.current_inventory > 0 && inv.size == size
  );

  const filteredInventory = inventory.find((inv) => inv.size == size);

  const targeInventory = {
    avaliable: checkAvaliable,
    filteredInventory,
  };

  return targeInventory;
}
