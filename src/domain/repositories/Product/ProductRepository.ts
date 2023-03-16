import { Product } from "../../models/Product";

export interface ProductRepository {
  addProduct(product: Product): Promise<void>;
  updateProduct(product: Product, id: string | number): Promise<void>;
  deleteProduct(id: string | number): Promise<void>;
  getProductById(id: string | number): Promise<Product>;
  getProducts(): Promise<Product[]>;
  getProductByType(type: string): Promise<Product[]>;
  getProductsByCategory(id: string): Promise<Product[]>;
  getProductsBySearch(search: string): Promise<Product[]>;
}
