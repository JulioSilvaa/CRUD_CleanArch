import { IService } from "src/core/entities/ServicesEntity";
import ServicesRepository from "src/core/repositories/ServicesRepository";

export default class ServicesRepositoryInMemory implements ServicesRepository {
  private listOfServices: any[] = [];
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getAll(userId: string): Promise<IService[]> {
    throw new Error("Method not implemented.");
  }

  async add({ name, price, description }: IService): Promise<void> {
    await this.listOfServices.push({ name, price, description });
  }
}
