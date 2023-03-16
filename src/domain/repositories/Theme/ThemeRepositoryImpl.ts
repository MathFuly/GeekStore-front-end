import { Api } from "../../../infrastructure/api";
import { Theme } from "../../models/Theme";
import { ThemeRepository } from "./ThemeRepository";

export class ThemeRepositoryImpl implements ThemeRepository {
  async addTheme(theme: Theme): Promise<void> {
    try {
      await Api.post("themes", theme);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  async updateTheme(theme: Theme, id: string | number): Promise<void> {
    try {
      await Api.post(`themes/${id}`, theme);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  async deleteTheme(id: string | number): Promise<void> {
    try {
      await Api.delete(`themes/${id}`);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  async getThemeById(id: string | number): Promise<Theme> {
    try {
      const response = await Api.get(`themes/${id}`);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
  async getThemesByCode(code: string): Promise<Theme[]> {
    try {
      const response = await Api.get(`themes/drop/${code}`);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  async getThemes(): Promise<Theme[]> {
    try {
      const response = await Api.get("themes");

      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
}
