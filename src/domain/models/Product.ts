import { Inventory } from "./Inventory";
import { Category } from "./Category";

export interface Product {
  id?: string | number;
  title: string;
  desc: string;
  image: string;
  dropcode: string;
  type: string;
  inventory?: Inventory[];
  ProductCategory?: ProductCategory;
  categoryId?: number;
}

export interface ProductCategory {
  id?: string | number;
  category: Category;
}
