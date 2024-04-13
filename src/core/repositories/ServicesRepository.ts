import { IService } from "../entities/ServicesEntity";

export default interface ServicesRepository {
  add({ name, price, description, userId }: IService): Promise<void>;
  getAll(userId: string): Promise<IService[]>;
  delete(id: string): Promise<void>;
}
