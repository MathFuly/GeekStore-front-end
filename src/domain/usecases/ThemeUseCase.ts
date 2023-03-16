import { Theme } from "../models/Theme";
import { ThemeRepository } from "../repositories/Theme/ThemeRepository";

export class ThemeUseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async addTheme(theme: Theme): Promise<void> {
    if (!theme) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.themeRepository.addTheme(theme);
  }

  async updateTheme(theme: Theme, id: string | number): Promise<void> {
    if (!theme || !id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.themeRepository.updateTheme(theme, id);
  }

  async deleteTheme(id: string | number): Promise<void> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.themeRepository.deleteTheme(id);
  }

  async getThemeById(id: string | number): Promise<Theme> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    return await this.themeRepository.getThemeById(id);
  }

  async getThemesByCode(code: string): Promise<Theme[]> {
    if (!code) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    return await this.themeRepository.getThemesByCode(code);
  }

  async getThemes(): Promise<Theme[]> {
    return await this.themeRepository.getThemes();
  }
}
