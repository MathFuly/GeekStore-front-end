import { Product } from "./Product";
import { User } from "./User";

export interface Sale {
  id?: number;
  code?: string;
  product?: Product;
  productid?: number;
  user?: User;
  userid?: number;
  discount?: number | null;
  price: number;
  size: string;
  quantity: number;
  deliverydate: Date;
  deliveryprice: number;
}
