import { Kart } from "../models/Kart";
import { KartRepository } from "../repositories/Kart/KartRepository";

export class KartUseCase {
  constructor(private readonly kartRepository: KartRepository) {}

  async addKart(kart: Kart): Promise<void> {
    if (!kart) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    return await this.kartRepository.addKart(kart);
  }

  async incrementKart(id: string): Promise<void> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    return await this.kartRepository.incrementKart(id);
  }

  async decrementKart(id: string): Promise<void> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    return await this.kartRepository.decrementKart(id);
  }

  async deleteKart(id: string): Promise<void> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    return await this.kartRepository.deleteKart(id);
  }

  async getKartsByUser(id: string): Promise<Kart[]> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    return await this.kartRepository.getKartsByUser(id);
  }
}
