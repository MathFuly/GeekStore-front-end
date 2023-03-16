import { Category } from "./Category";
import { Drop } from "./Drop";

export interface Theme {
  id?: number;
  dropcode?: string;
  categoryid?: number;
  logo: string;
  pagebanner: string;
  slidebanner: string;
  perfil: string;
  category?: Category;
  drop?: Drop;
}
