import { Api } from "./../../../infrastructure/api/index";
import { Product } from "../../models/Product";
import { ProductRepository } from "./ProductRepository";

export class ProductRepositoryImpl implements ProductRepository {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await Api.get("/products");

      return response.data;
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async getProductById(id: string | number): Promise<Product> {
    try {
      const response = await Api.get(`/products/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async addProduct(product: Product): Promise<void> {
    try {
      const response = await Api.post(`/products`, product);

      return response.data;
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async updateProduct(product: Product, id: string | number): Promise<void> {
    try {
      await Api.post(`/products/${id}`, product);
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async deleteProduct(id: string | number): Promise<void> {
    try {
      await Api.delete(`/products/${id}`);
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }
  async getProductByType(type: string): Promise<Product[]> {
    try {
      const response = await Api.get(`/products/type/${type}`);

      return response.data;
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async getProductsByCategory(id: string): Promise<Product[]> {
    try {
      const response = await Api.get(`/products/category/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }
  async getProductsBySearch(search: string): Promise<Product[]> {
    try {
      const response = await Api.get(`/products/search/${search}`);

      return response.data;
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }
}
