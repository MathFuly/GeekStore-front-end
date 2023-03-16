import { Category } from './../../models/Category';
import { Drop } from "../../models/Drop";

export interface DropRepository {
  addDrop(drop: Drop): Promise<void>;
  addDropTheme(promotional: Category): Promise<void>;
  updateDrop(drop: Drop, id: string | number): Promise<void>;
  updateDropTheme(promotional: Category, id: string | number): Promise<void>;
  deleteDrop(id: string | number): Promise<void>;
  deleteDropTheme(id: string | number): Promise<void>;
  getDropById(id: string | number): Promise<Drop>;
  getDrops(): Promise<Drop[]>;
}
