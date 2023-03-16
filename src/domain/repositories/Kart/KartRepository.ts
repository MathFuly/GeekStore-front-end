import { Kart } from "../../models/Kart";

export interface KartRepository {
  addKart(kart: Kart): Promise<void>;
  incrementKart(id: string): Promise<void>;
  decrementKart(id: string): Promise<void>;
  deleteKart(id: string): Promise<void>;
  getKartsByUser(id: string): Promise<Kart[]>;
}
