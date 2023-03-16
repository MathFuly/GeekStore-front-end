import { Product } from "../../models/Product";
import { Sale } from "../../models/Sale";

export interface SaleRepository {
  addSale(sales: Sale[]): Promise<void>;
  deleteSale(id: number): Promise<void>;
  getSales(): Promise<Sale[] | null>;
  getSalesByUserId(id: number): Promise<Sale[] | null>;
  getMostSales(): Promise<Product[] | null>;
}
