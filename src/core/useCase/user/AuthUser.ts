import UserRepository from "src/core/repositories/UserRepository";
import bcrypt from "bcrypt";
import { generateAccessToken } from "src/utils/generateToken";

export default class AuthUser {
  _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async execute(email: string, password: string) {
    const userFound = await this._userRepository.findByEmail(email);
    if (!userFound) {
      throw new Error("Usuário ou senha incorreto");
    }

    const passwordIsValid = await bcrypt.compare(password, userFound.password);
    if (!passwordIsValid) {
      throw new Error("Usuário ou senha incorreto");
    }

    const AuthenticatedUser = {
      id: userFound.id,
      name: userFound.name,
      phone: userFound.phone,
      email: userFound.email,
    };

    const token = generateAccessToken(AuthenticatedUser.id);

    return {
      ...AuthenticatedUser,
      token,
    };
  }
}
