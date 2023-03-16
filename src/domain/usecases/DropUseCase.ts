import { Drop } from "./../models/Drop";
import { DropRepository } from "./../repositories/Drop/DropRepository";

export class DropUseCase {
  constructor(private readonly dropRepository: DropRepository) {}

  async getDrops(): Promise<Drop[]> {
    return await this.dropRepository.getDrops();
  }

  async getDropById(id: string | number): Promise<Drop> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    return await this.dropRepository.getDropById(id);
  }

  async addDrop(drop: Drop): Promise<void> {
    if (!drop) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.dropRepository.addDrop(drop);
  }

  async updateDrop(drop: Drop, id: string | number): Promise<void> {
    if (!id || !drop) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.dropRepository.updateDrop(drop, id);
  }

  async deleteDrop(id: string | number): Promise<void> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.dropRepository.deleteDrop(id);
  }
}
