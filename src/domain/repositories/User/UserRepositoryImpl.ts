import { Api } from "../../../infrastructure/api";
import { Address } from "../../models/Address";
import { User } from "../../models/User";
import { UserRepository } from "./UserRepository";

export class UserRepositoryImpl implements UserRepository {
  async getUsers(): Promise<User[]> {
    try {
      const response = await Api.get("users");

      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  async getUserById(id: string | number): Promise<User> {
    try {
      const response = await Api.get(`users/${id}`);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  async addUser(user: User): Promise<void> {
    try {
      await Api.post("users", user);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  async updateUser(user: User, id: string | number): Promise<void> {
    try {
      await Api.post(`users/${id}`, user);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
  async updateUserPassword(
    newPassword: string,
    oldPassword: string,
    id: string
  ): Promise<void> {
    try {
      await Api.post(`users/password/${id}`, { newPassword, oldPassword });
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  async deleteUser(id: string | number): Promise<void> {
    try {
      await Api.delete(`users/${id}`);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  async addUserAdress(address: Address): Promise<void> {
    try {
      await Api.post("users/address", address);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  async updateUserAddress(address: Address): Promise<void> {
    try {
      await Api.post("users/address/update", address);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
  async deleteUserAddress(postalcode: string): Promise<void> {
    try {
      await Api.delete(`users/address/${postalcode}`);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
  async getUserAdressById(id: string): Promise<Address[] | null> {
    try {
      const response = await Api.get(`users/address/${id}`);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
}
