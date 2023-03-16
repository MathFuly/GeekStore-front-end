import { Api } from "../../../infrastructure/api";
import { Inventory } from "../../models/Inventory";
import { InventoryRepository } from "./InventoryRepository";

export class InventoryRepositoryImpl implements InventoryRepository {
  async getInventoriesByProductId(id: string | number): Promise<Inventory[]> {
    try {
      const response = await Api.get(`inventories/product/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async getInventoryById(id: string | number): Promise<Inventory> {
    try {
      const response = await Api.get(`inventories/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async addInventory(inventory: Inventory): Promise<void> {
    try {
      await Api.post(`inventories`, inventory);
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async updateInventory(
    inventory: Inventory,
    id: string | number
  ): Promise<void> {
    try {
      await Api.post(`inventories/${id}`, inventory);
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async deleteInventory(id: string | number): Promise<void> {
    try {
      await Api.delete(`inventories/${id}`);
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }
}
