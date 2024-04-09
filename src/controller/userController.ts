import CreateUserUseCase from "src/core/useCase/CreateUser";
import GetUsers from "src/core/useCase/GetUsers";
import UserRepositorySQL from "src/infra/repositorySQL/UserRepositorySQL";

export default class UserController {
  static async getUsers(params: any, body: any) {
    const userSQL = new UserRepositorySQL();
    const user = new GetUsers(userSQL);
    const userLista = await user.execute();
    return { status: 200, obj: { data: userLista } };
  }

  static async add(params: any, body: any) {
    const userSQL = new UserRepositorySQL();
    const user = new CreateUserUseCase(userSQL);
    await user.execute(body);
    return { status: 201, data: { message: "Usuário criado com sucesso" } };
  }
}