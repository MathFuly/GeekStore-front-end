import { Category } from "../models/Category";
import { CategoryRepository } from "./../repositories/Category/CategoryRepository";

export class CategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.getCategories();
  }

  async getCategoryById(id: string | number): Promise<Category> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    return await this.categoryRepository.getCategoryById(id);
  }

  async addCategory(category: Category): Promise<void> {
    if (!category) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.categoryRepository.addCategory(category);
  }

  async updateCategory(category: Category, id: string | number): Promise<void> {
    if (!id || !category) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.categoryRepository.updateCategory(category, id);
  }

  async deleteCategory(id: string | number): Promise<void> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.categoryRepository.deleteCategory(id);
  }
}
