import IUserInterface from "../entities/UserEntity"
import UserRepository from "../repositories/UserRepository"


export default class CreateUserUseCase {

  _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async execute({ name, email, phone, password }: IUserInterface) {
    const emailExists = await this._userRepository.findByEmail(email);
    if (emailExists) {
      console.log('E-mail already exists');
    }
    const user = await this._userRepository.save({ name, email, phone, password })
    return user
  }
}