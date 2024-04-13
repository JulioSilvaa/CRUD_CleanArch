import { IService } from "src/core/entities/ServicesEntity";
import ServicesRepository from "src/core/repositories/ServicesRepository";

export default class CreateService {
  _serviceRepository: ServicesRepository

  constructor(servicesRepository: ServicesRepository) {
    this._serviceRepository = servicesRepository;
  }

  async execute({ name, price, description, userId }: IService) {
    const service = await this._serviceRepository.add({ name, price, description, userId });
    return service;
  }
}