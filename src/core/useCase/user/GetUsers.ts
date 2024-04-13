import UserRepository from "src/core/repositories/UserRepository";

export default class GetUsers {
  _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async execute() {
    const userList = await this._userRepository.get();
    return userList;
  }
}
