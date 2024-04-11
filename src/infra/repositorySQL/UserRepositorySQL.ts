import { PrismaClient } from "@prisma/client";
import UserAdapter from "src/adapters/userAdapter";
import IUserInterface from "src/core/entities/UserEntity";
import UserRepository from "src/core/repositories/UserRepository";

export const prisma = new PrismaClient();

export default class UserRepositorySQL implements UserRepository {
  async save({ name, email, phone, password }: IUserInterface): Promise<void> {
    prisma.user.create({ data: { name, email, phone, password } });
  }

  async findByEmail(email: string): Promise<any | null> {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return null;
    }

    return UserAdapter.create({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      createdAt: user.createdAt,
    });
  }

  async findUserById(id: string): Promise<any | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return UserAdapter.create({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      createdAt: user.createdAt,
    });
  }

  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } })
  }

  async get(): Promise<IUserInterface[] | any> {
    const userList: IUserInterface[] = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return {userList, quantity: userList.length};
  }
}
