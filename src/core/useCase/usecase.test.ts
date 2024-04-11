import { describe, expect, test } from "vitest";

import GetUserByEmail from "src/core/useCase/GetUserByEmail";
import GetUsers from "src/core/useCase/GetUsers";
import CreateUserUseCase from "src/core/useCase/CreateUser";
import UserRepositoryInMemory from "src/infra/UserRepositoryInMemory/UserRepositoryInMemory";


describe("Unit test CreateUseCase", () => {
  const user = {
    name: "julio",
    email: "julio@teste",
    phone: "4234242",
    password: "23234234",
  };
  test("should create users", async () => {
   
    const userSql = new UserRepositoryInMemory();
    const createUser = new CreateUserUseCase(userSql);
    const usersList = await createUser.execute(user);
    console.log(usersList);
  });

  test("should get all users", async () => {
    const userSql = new UserRepositoryInMemory();
    const findUsersLIst = new GetUsers(userSql);
    const usersList = await findUsersLIst.execute();
    console.log(usersList);
  });
  test("should get users by email", async () => {
    const userSql = new UserRepositoryInMemory();
    const findUsersLIst = new GetUserByEmail(userSql);
    const usersList = await findUsersLIst.execute(user.email);
    console.log(usersList);
  });
});