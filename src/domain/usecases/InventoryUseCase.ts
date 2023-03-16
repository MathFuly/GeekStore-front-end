import { Inventory } from "../models/Inventory";
import { InventoryRepository } from "./../repositories/Inventory/InventoryRepository";

export class InventoryUseCase {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async getInventoriesByProductId(id: string | number): Promise<Inventory[]> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    return await this.inventoryRepository.getInventoriesByProductId(id);
  }

  async getInventoryById(id: string | number): Promise<Inventory> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    return await this.inventoryRepository.getInventoryById(id);
  }

  async addInventory(inventory: Inventory): Promise<void> {
    if (!inventory) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.inventoryRepository.addInventory(inventory);
  }

  async updateInventory(
    inventory: Inventory,
    id: string | number
  ): Promise<void> {
    if (!inventory || !id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.inventoryRepository.updateInventory(inventory, id);
  }

  async deleteInventory(id: string | number): Promise<void> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.inventoryRepository.deleteInventory(id);
  }
}
