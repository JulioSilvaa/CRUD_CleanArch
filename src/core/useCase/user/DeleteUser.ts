import UserRepository from "src/core/repositories/UserRepository";


export default class DeleteUser {
  _userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async execute(id: string): Promise<void> {

    const userDeleted = await this._userRepository.deleteUser(id)
    return userDeleted


  }
} 