import { Api } from "../../../infrastructure/api";
import { Kart } from "../../models/Kart";
import { KartRepository } from "./KartRepository";

export class KartRepositoryImpl implements KartRepository {
  async addKart(kart: Kart): Promise<void> {
    try {
      await Api.post(`kart`, kart);
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async incrementKart(id: string): Promise<void> {
    try {
      await Api.post(`kart/increment`, { id });
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async decrementKart(id: string): Promise<void> {
    try {
      await Api.post(`kart/decrement`, { id });
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async deleteKart(id: string): Promise<void> {
    try {
      await Api.delete(`kart/${id}`);
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }

  async getKartsByUser(id: string): Promise<Kart[]> {
    try {
      const response = await Api.get(`kart/user/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(
        "Não foi possível concluir a ação, tente novamente mais tarde!"
      );
    }
  }
}
