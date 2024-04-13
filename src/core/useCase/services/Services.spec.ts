import { describe, expect, test } from "vitest";
import CreateService from "./Create";
import ServicesRepositoryInMemory from "src/infra/repositoryInMemory/services/ServicesRepositoryInMemory";

describe("Unit test Service useCase", () => {
  const service = {
    name: "Cote de cabelo na régua",
    price: "200",
    description: "corte surfista com pezinho na zero",
    userId: "",
  };
  test("should create a service", async () => {
    const repoInMemory = new ServicesRepositoryInMemory();
    const createdService = new CreateService(repoInMemory);
    const serviceData = await createdService.execute(service);
    console.log(serviceData);
  });
});
