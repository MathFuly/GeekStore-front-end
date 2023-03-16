import { Inventory } from "./../../models/Inventory";

export interface InventoryRepository {
  addInventory(inventory: Inventory): Promise<void>;
  updateInventory(inventory: Inventory, id: string | number): Promise<void>;
  deleteInventory(id: string | number): Promise<void>;
  getInventoryById(id: string | number): Promise<Inventory>;
  getInventoriesByProductId(id: string | number): Promise<Inventory[]>;
}
