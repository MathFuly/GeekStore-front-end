import { Product } from "./Product";
import { User } from "./User";

export interface Kart {
  id?: number;
  user?: User;
  userid?: number;
  product?: Product;
  size: string;
  productid?: number;
  quantity: number;
  price: number;
  discount: number;
  created_at?: Date;
}
