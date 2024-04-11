import { assert, describe, expect, test } from "vitest";
import UserRepositorySQL from "./UserRepositorySQL";
import GetUserByEmail from "src/core/useCase/GetUserByEmail";
import GetUsers from "src/core/useCase/GetUsers";
import CreateUserUseCase from "src/core/useCase/CreateUser";
import GetUserById from "src/core/useCase/GetUserById";

describe.skip("Unit test CreateUseCase", () => {
  const user = {
    name: "julio",
    email: "julio@teste",
    phone: "4234242",
    password: "23234234",
  };
  test("should create users", async () => {
    const userSql = new UserRepositorySQL();
    const createUser = new CreateUserUseCase(userSql);
    await createUser.execute(user);

    // Verifica no banco de dados se o usuário foi criado com sucesso
    const userFromDB = await userSql.findByEmail(user.email);
    expect(userFromDB).toBeDefined();
    expect(userFromDB.name).toBe(user.name);
    expect(userFromDB.email).toBe(user.email);
    expect(userFromDB.phone).toBe(user.phone);
  });

  


  test("should return array with users with same keys as user object", async () => {
    const userSql = new UserRepositorySQL();
    const findUsersList = new GetUsers(userSql);
    const usersList = await findUsersList.execute();

    // Verifica se usersList é um array
    expect(Array.isArray(usersList)).toBe(true);

    // Verifica se cada objeto no array tem as mesmas chaves que o objeto user
    if (usersList.length > 0) {
      usersList.forEach(userObject => {
        expect(Object.keys(userObject)).toEqual(expect.arrayContaining(Object.keys(user)));
      });
    }
  });


  test("should get users by Email", async () => {
    const userSql = new UserRepositorySQL();
    const findUserByEmail = new GetUserByEmail(userSql);
    const userDB = await findUserByEmail.execute(user.email);
    expect(Object.keys(userDB)).toEqual(expect.arrayContaining(Object.keys(user)));
  });
 
 
  test("should get users by id", async () => {
    const userSql = new UserRepositorySQL();
    const findUserById = new GetUserById(userSql);
    const userDB = await findUserById.execute("fadaaab2-948b-4c68-8edb-e9b1bf5dcbd6");
    expect(Object.keys(userDB)).toEqual(expect.arrayContaining(Object.keys(user)));
  });



})
