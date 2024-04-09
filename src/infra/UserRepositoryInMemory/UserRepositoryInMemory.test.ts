import { describe, expect, test } from "vitest";
import UserRepositoryInMemory from "./UserRepositoryInMemory";
import CreateUserUseCase from "src/core/useCase/CreateUser";

describe.skip("Unit test CreateUseCase", () => {
  const user = {
    name: "julio",
    email: "julio@teste",
    phone: "4234242",
    password: "23234234",
  };
  test("should create users", async () => {
    const userInMemory = new UserRepositoryInMemory();
    const createUser = new CreateUserUseCase(userInMemory);
    await createUser.execute(user);
  });
})