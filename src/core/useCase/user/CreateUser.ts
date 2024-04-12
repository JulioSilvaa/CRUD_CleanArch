import bcrypt from "bcrypt";
import { IUserInterface } from "src/core/entities/UserEntity";
import UserRepository from "src/core/repositories/UserRepository";


export default class CreateUserUseCase {
  _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async execute({ name, email, password, phone }: IUserInterface) {
    const numberOfSalt = 14;
    const passwordHash = await bcrypt.hash(password, numberOfSalt);

    const user = await this._userRepository.save({
      name,
      email,
      phone,
      password: passwordHash,
    });
    return user;
  }
}
