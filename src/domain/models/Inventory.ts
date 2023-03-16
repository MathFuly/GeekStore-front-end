export interface Inventory {
  id?: string | number;
  initial_inventory: string | number;
  current_inventory: string | number;
  price: number;
  discount: number;
  size: string;
}
