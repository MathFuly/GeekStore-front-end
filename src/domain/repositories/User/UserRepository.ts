import { Address } from "../../models/Address";
import { User } from "../../models/User";

export interface UserRepository {
  addUser(user: User): Promise<void>;
  updateUser(user: User, id: string): Promise<void>;
  updateUserPassword(
    newPassword: string,
    oldPassword: string,
    id: string
  ): Promise<void>;
  deleteUser(id: string): Promise<void>;
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;

  addUserAdress(address: Address): Promise<void>;
  updateUserAddress(address: Address): Promise<void>;
  deleteUserAddress(postalcode: string): Promise<void>;
  getUserAdressById(id: string): Promise<Address[] | null>;
}
