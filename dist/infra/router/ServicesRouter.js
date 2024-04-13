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

// src/infra/repositorySQL/services/ServicesRepositorySQL.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var ServiceRepositorySQL = class {
  async delete(id) {
    await prisma.service.delete({ where: { id } });
  }
  async getAll(userId) {
    const serviceList = await prisma.service.findMany({
      where: { userId },
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
      const serviceSQL = new ServiceRepositorySQL();
      await serviceSQL.add(req.body);
      res.status(201).json({ message: "Servi\xE7o adicionado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req, res, next) {
    try {
      const serviceSQL = new ServiceRepositorySQL();
      const list = await serviceSQL.getAll(
        "a7cf3e54-fd05-4533-80ca-2a8419be7abc"
        //quando estiver logado passo o id
      );
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
      serviceSQL.delete(id);
      res.status(200).json({ message: "Servi\xE7o exclu\xEDdo com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
};

// src/infra/router/ServicesRouter.ts
var router = (0, import_express.Router)();
router.post("/", ExpressAdapter.create(ServicesController.add));
router.get("/", ExpressAdapter.create(ServicesController.getAll));
router.delete("/:id", ExpressAdapter.create(ServicesController.delete));
var ServicesRouter_default = router;
