import IUserInterface from "src/core/entities/UserEntity";
import UserEntity from "../core/entities/UserEntity";

export default class UserAdapter {
  static async create({
    id,
    name,
    email,
    phone,
    password,
    createdAt,
  }: any | IUserInterface[]) {
    return new UserEntity({ id, name, email, phone, password, createdAt });
  }
}
