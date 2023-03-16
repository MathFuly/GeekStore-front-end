import { Category } from "./../../models/Category";

export interface CategoryRepository {
  addCategory(category: Category): Promise<void>;
  updateCategory(category: Category, id: string | number): Promise<void>;
  deleteCategory(id: string | number): Promise<void>;
  getCategoryById(id: string | number): Promise<Category>;
  getCategories(): Promise<Category[]>;
}
