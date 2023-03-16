import { Product } from "../models/Product";
import { Sale } from "../models/Sale";
import { SaleRepository } from "../repositories/Sale/SaleRepository";

export class SaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async addSale(sales: Sale[]): Promise<void> {
    if (sales.length === 0) {
      throw new Error("Nenhuma compra para ser adicionada");
    }

    try {
      await this.saleRepository.addSale(sales);
    } catch (error) {
      throw new Error("Não foi possível adicionar a venda");
    }
  }

  async deleteSale(id: number): Promise<void> {
    if (!id) {
      throw new Error("Não foi possível encontrar a compra.");
    }

    try {
      await this.saleRepository.deleteSale(id);
    } catch (error) {
      throw new Error("Não foi possível remover a compra");
    }
  }

  async getSales(): Promise<Sale[] | null> {
    try {
      const sales = await this.saleRepository.getSales();
      if (sales === null) {
        throw new Error("Nenhuma compra encontrada");
      }
      return sales;
    } catch (error) {
      throw new Error("Não foi possível buscar as compras");
    }
  }
  async getMostSales(): Promise<Product[] | null> {
    try {
      const products = await this.saleRepository.getMostSales();
      if (products === null) {
        throw new Error("Nenhuma produto encontrado");
      }
      return products;
    } catch (error) {
      throw new Error("Não foi possível buscar os produtos");
    }
  }

  async getSalesByUserId(id: number): Promise<Sale[] | null> {
    if (!id) {
      throw new Error("Não foi possível encontrar o usuário e suas compras.");
    }

    try {
      const sales = await this.saleRepository.getSalesByUserId(id);
      if (sales === null) {
        throw new Error("Nenhuma compra encontrada para esse usuário");
      }
      return sales;
    } catch (error) {
      throw new Error("Não foi possível buscar as compras do usuário");
    }
  }
}
