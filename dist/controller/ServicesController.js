"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controller/ServicesController.ts
var ServicesController_exports = {};
__export(ServicesController_exports, {
  default: () => ServicesController
});
module.exports = __toCommonJS(ServicesController_exports);

// src/core/useCase/services/Create.ts
var CreateService = class {
  _serviceRepository;
  constructor(servicesRepository) {
    this._serviceRepository = servicesRepository;
  }
  async execute({ name, price, description, userId }) {
    const service = await this._serviceRepository.add({ name, price, description, userId });
    return service;
  }
};

// src/core/useCase/services/Delete.ts
var DeleteService = class {
  _servicesRepository;
  constructor(servicesRepository) {
    this._servicesRepository = servicesRepository;
  }
  async execute(id) {
    await this._servicesRepository.delete(id);
  }
};

// src/core/useCase/services/GetAll.ts
var GetAllServices = class {
  _servicesRepository;
  constructor(serviceRepository) {
    this._servicesRepository = serviceRepository;
  }
  async execute(userId) {
    const servicesList = await this._servicesRepository.getAll(userId);
    return servicesList;
  }
};

// src/infra/repositorySQL/services/ServicesRepositorySQL.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var ServiceRepositorySQL = class {
  async delete(id) {
    await prisma.service.delete({ where: { id } });
  }
  async getAll(userId) {
    const serviceList = await prisma.service.findMany({
      select: { name: true, price: true, description: true },
      orderBy: { createdAt: "desc" }
    });
    return serviceList;
  }
  async add({ name, price, description, userId }) {
    await prisma.service.create({ data: { name, price, description, userId } });
  }
};

// src/controller/ServicesController.ts
var ServicesController = class {
  static async add(req, res, next) {
    try {
      const userId = req.user_id;
      const { name, price, description } = req.body;
      const serviceSQL = new ServiceRepositorySQL();
      const createNewService = new CreateService(serviceSQL);
      await createNewService.execute({ name, price, description, userId });
      res.status(201).json({ message: "Servi\xE7o adicionado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req, res, next) {
    try {
      const serviceSQL = new ServiceRepositorySQL();
      const serviceLIst = new GetAllServices(serviceSQL);
      const list = await serviceLIst.execute(req.user_id);
      if (list.length === 0) {
        res.status(200).json({ message: "Lista vazia" });
      }
      res.status(200).json({ data: list });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const id = req.params.id;
      const serviceSQL = new ServiceRepositorySQL();
      const deleteService = new DeleteService(serviceSQL);
      await deleteService.execute(id);
      res.status(200).json({ message: "Servi\xE7o exclu\xEDdo com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
};
