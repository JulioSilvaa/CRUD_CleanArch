import ServicesRepository from "src/core/repositories/ServicesRepository";

export default class GetAllServices {
  _servicesRepository: ServicesRepository;

  constructor(serviceRepository: ServicesRepository) {
    this._servicesRepository = serviceRepository;
  }

  async execute(userId: string) {
    const servicesList = await this._servicesRepository.getAll(userId);
    return servicesList;
  }
}
