import UserAdapter from "src/adapters/userAdapter";
import IUserInterface from "src/core/entities/UserEntity";
import UserRepository from "src/core/repositories/UserRepository";

export default class UserRepositoryInMemory implements UserRepository {
  userList: any[] = [
    {
      id: 1,
      name: "Julio",
      email: "julio@teste",
      phone: "234234234",
      password: "435345",
    },
    {
      id: 2,
      name: "Luan",
      email: "luan@teste.com",
      phone: "234234234",
      password: "435345",
    },
  ];

  findUserById(id: string): Promise<IUserInterface> {
    const user = this.userList.find((user) => user.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<IUserInterface> {
    const user = await this.userList.find((user) => user.email === email);
    const userToAdapter = UserAdapter.create(user);
    return userToAdapter;
  }

  async deleteUser(id: string): Promise<void> {
    this.userList.filter(user => user.id === id);

  }

  async get(): Promise<IUserInterface[]> {
    const users = await this.userList;
    return users;
  }

  async save({ name, email }: IUserInterface): Promise<void> {
    this.userList.push({ name, email });
  }
}
