import { NextFunction, Request, Response } from "express";
import CreateUserUseCase from "src/core/useCase/CreateUser";
import EditeUser from "src/core/useCase/EditeUser";
import GetUserByEmail from "src/core/useCase/GetUserByEmail";
import GetUserById from "src/core/useCase/GetUserById";
import GetUsers from "src/core/useCase/GetUsers";
import UserRepositorySQL from "src/infra/repositorySQL/UserRepositorySQL";

export default class UserController {
  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const userSQL = new UserRepositorySQL();
      const checkEmailExists = new GetUserByEmail(userSQL);
      const emailAlreadyExists = await checkEmailExists.execute(req.body.email);

      if (emailAlreadyExists) {
        return res.status(400).json({ message: "Email já está em uso" });
      }
      const user = new CreateUserUseCase(userSQL);
      await user.execute(req.body);
      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  static async findUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("Usuário não encontrado");
      }
      const userSQL = new UserRepositorySQL();
      const getUserById = new GetUserById(userSQL);
      const user = await getUserById.execute(id);
      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }


  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;

      if (!id) {
        throw new Error("Usuário não encontrado");
      }
      const userSQL = new UserRepositorySQL();
      const getUserById = new GetUserById(userSQL);
      const user = await getUserById.execute(id as string);
      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }



  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userSQL = new UserRepositorySQL();
      const user = await userSQL.findUserById(id);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      await userSQL.deleteUser(user.id);

      return res.status(200).json({ message: "Usuário excluído com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userSQL = new UserRepositorySQL();
      const user = await userSQL.findUserById(id);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      const editUser = new EditeUser(userSQL);
      editUser.execute(user, req.body);
      return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }


  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const userSQL = new UserRepositorySQL();
      const user = new GetUsers(userSQL);
      const userLista = await user.execute();
      return res.status(200).json({ userLista, quantity: userLista.length });
    } catch (error) {
      next(error);
    }
  }
}
