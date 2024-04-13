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

// src/infra/repositoryInMemory/services/ServicesRepositoryInMemory.ts
var ServicesRepositoryInMemory_exports = {};
__export(ServicesRepositoryInMemory_exports, {
  default: () => ServicesRepositoryInMemory
});
module.exports = __toCommonJS(ServicesRepositoryInMemory_exports);
var ServicesRepositoryInMemory = class {
  listOfServices = [];
  delete(id) {
    throw new Error("Method not implemented.");
  }
  async getAll(userId) {
    throw new Error("Method not implemented.");
  }
  async add({ name, price, description }) {
    await this.listOfServices.push({ name, price, description });
  }
};
