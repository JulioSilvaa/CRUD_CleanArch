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

// src/infra/repositorySQL/services/ServicesRepositorySQL.ts
var ServicesRepositorySQL_exports = {};
__export(ServicesRepositorySQL_exports, {
  default: () => ServiceRepositorySQL,
  prisma: () => prisma
});
module.exports = __toCommonJS(ServicesRepositorySQL_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  prisma
});
