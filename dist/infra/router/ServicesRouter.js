"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/infra/router/ServicesRouter.ts
var ServicesRouter_exports = {};
__export(ServicesRouter_exports, {
  default: () => ServicesRouter_default
});
module.exports = __toCommonJS(ServicesRouter_exports);
var import_express = require("express");

// src/adapters/ExpressAdapter.ts
var ExpressAdapter = class {
  static create(fn) {
    return async function(req, res, next) {
      const obj = await fn(req, res, next);
      try {
        return obj;
      } catch (error) {
        return error;
      }
    };
  }
};

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

// src/middlewares/AuthMiddleware.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var AuthMiddleware = class {
  auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.send(401);
    }
    const [, token] = authHeader.split(" ");
    if (!token) {
      return res.send(401);
    }
    if (process.env.JWT_ACCESS_SECRET)
      try {
        const { sub } = import_jsonwebtoken.default.verify(
          token,
          process.env.JWT_ACCESS_SECRET
        );
        req.user_id = sub;
        next();
      } catch (error) {
        return res.status(500).json({ message: error });
      }
  }
};
var AuthMiddleware_default = new AuthMiddleware();

// src/infra/router/ServicesRouter.ts
var router = (0, import_express.Router)();
router.post(
  "/",
  AuthMiddleware_default.auth,
  ExpressAdapter.create(ServicesController.add)
);
router.get("/", ExpressAdapter.create(ServicesController.getAll));
router.delete("/:id", ExpressAdapter.create(ServicesController.delete));
var ServicesRouter_default = router;
