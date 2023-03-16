import { Api } from "../../../infrastructure/api";
import { Category } from "../../models/Category";
import { CategoryRepository } from "./CategoryRepository";

export class CategoryRepositoryImpl implements CategoryRepository {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await Api.get("categories");

      return response.data;
    } catch (error: any) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async getCategoryById(id: string | number): Promise<Category> {
    try {
      const response = await Api.get(`categories/${id}`);

      return response.data;
    } catch (error: any) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async addCategory(category: Category): Promise<void> {
    try {
      await Api.post("categories", category);
    } catch (error) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async updateCategory(category: Category, id: string | number): Promise<void> {
    try {
      await Api.post(`categories/${id}`, category);
    } catch (error) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async deleteCategory(id: string | number): Promise<void> {
    try {
      await Api.delete(`categories/${id}`);
    } catch (error) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }
}
