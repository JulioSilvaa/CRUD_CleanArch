import UserRepository from "../repositories/UserRepository";

export default class GetUserById {
  _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async execute(id: string) {
    const user = await this._userRepository.findUserById(id);
    if (!user) {
      throw new Error("Usuário não cadastrado");
    }
    return user;
  }
}
