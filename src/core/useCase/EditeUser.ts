import { IUserInterface } from "../entities/UserEntity";
import UserRepository from "../repositories/UserRepository";


export default class EditeUser {
  _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async execute(user: IUserInterface, dataBody: any): Promise<void> {
    await this._userRepository.update(user, dataBody);
  }
}