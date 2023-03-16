import { Address } from "../models/Address";
import { User } from "../models/User";
import { UserRepository } from "../repositories/User/UserRepository";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }

  async getUserById(id: string): Promise<User | null> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    return await this.userRepository.getUserById(id);
  }

  async addUser(user: User): Promise<void> {
    if (!user.name) {
      throw new Error("O campo nome é obrigatório!");
    }

    if (!user.lastname) {
      throw new Error("O campo sobrenome é obrigatório!");
    }

    if (!user.email) {
      throw new Error("O campo CPF é obrigatório!");
    }

    if (!user.cpf) {
      throw new Error("O campo CPF é obrigatório!");
    }

    if (!user.phone1) {
      throw new Error("O campo telefone é obrigatório!");
    }

    if (!user.password) {
      throw new Error("O campo senha é obrigatório!");
    }

    await this.userRepository.addUser(user);
  }

  async updateUserPassword(
    newPassword: string,
    oldPassword: string,
    id: string
  ): Promise<void> {
    if (!id || !newPassword || !oldPassword) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.userRepository.updateUserPassword(newPassword, oldPassword, id);
  }
  async updateUser(user: User, id: string): Promise<void> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    if (!user) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.userRepository.updateUser(user, id);
  }

  async deleteUser(id: string): Promise<void> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.userRepository.deleteUser(id);
  }

  async addUserAdress(address: Address): Promise<void> {
    if (!address) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.userRepository.addUserAdress(address);
  }

  async updateUserAddress(address: Address): Promise<void> {
    if (!address) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.userRepository.updateUserAddress(address);
  }

  async deleteUserAddress(postalcode: string): Promise<void> {
    if (!postalcode) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    await this.userRepository.deleteUserAddress(postalcode);
  }

  async getUserAdressById(id: string): Promise<Address[] | null> {
    if (!id) {
      throw new Error(
        "Impossível completar a ação, tente novamente mais tarde!"
      );
    }

    return await this.userRepository.getUserAdressById(id);
  }
}
