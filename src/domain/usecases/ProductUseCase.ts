import { ProductRepository } from "./../repositories/Product/ProductRepository";
import { Product } from "../models/Product";

export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.getProducts();
    } catch (error) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async getProductById(id: string | number): Promise<Product> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    try {
      return await this.productRepository.getProductById(id);
    } catch (error) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async addProduct(product: Product): Promise<void> {
    if (!product) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    try {
      await this.productRepository.addProduct(product);
    } catch (error) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async updateProduct(product: Product, id: string | number): Promise<void> {
    if (!product || !id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    try {
      await this.productRepository.updateProduct(product, id);
    } catch (error) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async deleteProduct(id: string | number): Promise<void> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    try {
      await this.productRepository.deleteProduct(id);
    } catch (error) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async getProductByType(type: string): Promise<Product[]> {
    if (!type) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    try {
      return await this.productRepository.getProductByType(type);
    } catch (error) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }
  async getProductsByCategory(id: string): Promise<Product[]> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    try {
      return await this.productRepository.getProductsByCategory(id);
    } catch (error) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }
  async getProductsBySearch(search: string): Promise<Product[]> {
    if (!search) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    try {
      return await this.productRepository.getProductsBySearch(search);
    } catch (error) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }
}
