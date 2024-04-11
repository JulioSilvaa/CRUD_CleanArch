import bcrypt from 'bcryptjs'
import IUserInterface from "../entities/UserEntity";
import UserRepository from "../repositories/UserRepository";

export default class CreateUserUseCase {
  _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async execute({ name, email, phone, password }: IUserInterface) {
    if (!name || !email || !phone || !password) {
      throw new Error("Preencher todos os campos!");
    }
    const numberOfSalt = process.env.SALT_PASSWORD_HASH;
    if (!numberOfSalt) {
      throw new Error("senha não é segura");
    }
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
