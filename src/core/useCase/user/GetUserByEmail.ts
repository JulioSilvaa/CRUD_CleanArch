import UserRepository from "src/core/repositories/UserRepository";


export default class GetUserByEmail {
  _useRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this._useRepository = userRepository;
  }

  async execute(email: string) {
    const user = await this._useRepository.findByEmail(email);
    return user;
  }
}
