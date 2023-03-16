import { Theme } from "../../models/Theme";

export interface ThemeRepository {
  addTheme(theme: Theme): Promise<void>;
  updateTheme(theme: Theme, id: string | number): Promise<void>;
  deleteTheme(id: string | number): Promise<void>;
  getThemeById(id: string | number): Promise<Theme>;
  getThemesByCode(code: string): Promise<Theme[]>;
  getThemes(): Promise<Theme[]>;
}
