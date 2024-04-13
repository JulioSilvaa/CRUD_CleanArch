import ServicesRepository from "src/core/repositories/ServicesRepository";

export default class DeleteService {
  _servicesRepository: ServicesRepository;

  constructor(servicesRepository: ServicesRepository) {
    this._servicesRepository = servicesRepository;
  }

  async execute(id: string) {
    await this._servicesRepository.delete(id);
  }
}
