import IUserInterface from "../entities/UserEntity";

export default interface UserRepository {
  save({ name, email, phone, password }: IUserInterface): Promise<void>;
  get(): Promise<IUserInterface[]>;
  findByEmail(email: string): Promise<IUserInterface>;
  findUserById(id: string): Promise<IUserInterface>;
  deleteUser(id: any): Promise<void>
  update(user: IUserInterface, dataBody: any): Promise<void>
}
