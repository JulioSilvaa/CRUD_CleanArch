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

// src/core/useCase/services/Create.ts
var Create_exports = {};
__export(Create_exports, {
  default: () => CreateService
});
module.exports = __toCommonJS(Create_exports);
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
