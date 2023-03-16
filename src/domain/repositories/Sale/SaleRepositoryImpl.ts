import { Api } from "../../../infrastructure/api";
import { Product } from "../../models/Product";
import { Sale } from "../../models/Sale";
import { SaleRepository } from "./SaleRepository";

export class SaleRepositoryImpl implements SaleRepository {
  async addSale(sales: Sale[]): Promise<void> {
    try {
      await Api.post("sales", sales);
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async deleteSale(id: number): Promise<void> {
    try {
      await Api.delete(`sales/${id}`);
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async getSales(): Promise<Sale[] | null> {
    try {
      const response = await Api.get("sales");

      return response.data;
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }
  async getMostSales(): Promise<Product[] | null> {
    try {
      const response = await Api.get("sales/hot");

      return response.data;
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async getSalesByUserId(id: number): Promise<Sale[] | null> {
    try {
      const response = await Api.get(`sales/user/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }
}
