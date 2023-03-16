import { ThemeRepositoryImpl } from "../domain/repositories/Theme/ThemeRepositoryImpl";
import { ThemeUseCase } from "../domain/usecases/ThemeUseCase";
import { getCurrentDropCode } from "./getCurrentDropCode";

export async function getRandomBanner() {
  const themeRepository = new ThemeRepositoryImpl();
  const themeUseCase = new ThemeUseCase(themeRepository);

  const dropcode = getCurrentDropCode();

  const data = await themeUseCase.getThemesByCode(dropcode);

  const randomNumber = Math.floor(Math.random() * data.length);

  return data[randomNumber].pagebanner;
}
