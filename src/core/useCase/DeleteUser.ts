import UserRepository from "../repositories/UserRepository";

export default class DeleteUser {
  _userRepository: UserRepository;
  constructor(userRespository: UserRepository) {
    this._userRepository = userRespository
  }

  async execute(id: string): Promise<void> {

    const userdeleted = await this._userRepository.deleteUser(id)
    return userdeleted


  }
} 