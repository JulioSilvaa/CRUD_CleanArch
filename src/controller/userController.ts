import { query } from "express";
import CreateUserUseCase from "src/core/useCase/CreateUser";
import DeleteUser from "src/core/useCase/DeleteUser";
import GetUserByEmail from "src/core/useCase/GetUserByEmail";
import GetUserById from "src/core/useCase/GetUserById";
import GetUsers from "src/core/useCase/GetUsers";
import UserRepositorySQL from "src/infra/repositorySQL/UserRepositorySQL";

export default class UserController {
  static async add(params: any, body: any, res: any, next: any) {
    try {
      const userSQL = new UserRepositorySQL();
      const checkEmailExists = new GetUserByEmail(userSQL);
      const emailAlreadyExists = await checkEmailExists.execute(body.email);

      if (emailAlreadyExists) {
        return res.status(400).json({ message: "Email já está em uso" });
      }

      const user = new CreateUserUseCase(userSQL);
      await user.execute(body);
      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  static async findUserById(req: any, body: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const userSQL = new UserRepositorySQL();
      const getUserById = new GetUserById(userSQL);
      const user = await getUserById.execute(id);
      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(params: any, body: any, res: any, next: any) {
    try {
      const userSQL = new UserRepositorySQL();
      const user = new GetUsers(userSQL);
      const userLista = await user.execute();
      return res.status(200).json({ data: userLista });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req: any, body: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const userSQL = new UserRepositorySQL();
      const user = await userSQL.findUserById(id); // Verificar se o usuário existe antes de tentar deletar
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      await userSQL.deleteUser(user.id);

    

      return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
}
