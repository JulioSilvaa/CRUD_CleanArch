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

// src/core/useCase/GetUserByEmail.ts
var GetUserByEmail_exports = {};
__export(GetUserByEmail_exports, {
  default: () => GetUserByEmail
});
module.exports = __toCommonJS(GetUserByEmail_exports);
var GetUserByEmail = class {
  _useRepository;
  constructor(userRepository) {
    this._useRepository = userRepository;
  }
  async execute(email) {
    const user = await this._useRepository.findByEmail(email);
    return user;
  }
};
