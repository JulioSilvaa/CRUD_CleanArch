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

// src/core/useCase/GetUserById.ts
var GetUserById_exports = {};
__export(GetUserById_exports, {
  default: () => GetUserById
});
module.exports = __toCommonJS(GetUserById_exports);
var GetUserById = class {
  _userRepository;
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  async execute(id) {
    const user = await this._userRepository.findUserById(id);
    if (!user) {
      throw new Error("Usu\xE1rio n\xE3o cadastrado");
    }
    return user;
  }
};
