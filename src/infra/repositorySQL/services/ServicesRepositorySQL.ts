import { PrismaClient } from "@prisma/client";
import { IService } from "src/core/entities/ServicesEntity";

import ServicesRepository from "src/core/repositories/ServicesRepository";

export const prisma = new PrismaClient();

export default class ServiceRepositorySQL implements ServicesRepository {
  async delete(id: string): Promise<void> {
    await prisma.service.delete({ where: { id } });
  }
  async getAll(userId: string): Promise<any> {
    const serviceList = await prisma.service.findMany({
      select: { name: true, price: true, description: true },
      orderBy: { createdAt: "desc" },
    });
    return serviceList;
  }

  async add({ name, price, description, userId }: IService): Promise<void> {
    await prisma.service.create({ data: { name, price, description, userId } });
  }
}
