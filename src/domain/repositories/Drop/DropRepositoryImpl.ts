import { Promotional } from './../../models/Drop';
import { Api } from "./../../../infrastructure/api/index";
import { Drop, Promotional } from "../../models/Drop";
import { DropRepository } from "./DropRepository";

export class DropsRepositoryImpl implements DropRepository {
  async getDrops(): Promise<Drop[]> {
    try {
      const response = await Api.get("drops");

      return response.data;
    } catch (error: any) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async getDropById(id: string | number): Promise<Drop> {
    try {
      const response = await Api.get(`drops/${id}`);

      return response.data;
    } catch (error: any) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async addDrop(drop: Drop): Promise<void> {
    try {
      await Api.post(`drops`, drop);
    } catch (error: any) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async addDropTheme(promotional: Promotional): Promise<void> {
    try {
      await Api.post(`themes`, promotional);
    } catch (error: any) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async updateDrop(drop: Drop, id: string | number): Promise<void> {
    try {
      await Api.post(`drops/${id}`, drop);
    } catch (error: any) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async updateDropTheme(
    promotional: Promotional,
    id: string | number
  ): Promise<void> {
    try {
      await Api.post(`themes/${id}`, promotional);
    } catch (error: any) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async deleteDrop(id: string | number): Promise<void> {
    try {
      await Api.delete(`drops/${id}`);
    } catch (error: any) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async deleteDropTheme(id: string | number): Promise<void> {
    try {
      await Api.delete(`themes/${id}`);
    } catch (error: any) {
      throw new Error(
        "Não foi possível completar a ação, tente novamente mais tarde!"
      );
    }
  }

  async getTheme(promotional: Promotional) {
    
  };
}
