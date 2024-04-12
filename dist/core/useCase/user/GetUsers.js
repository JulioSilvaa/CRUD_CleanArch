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

// src/core/useCase/user/GetUsers.ts
var GetUsers_exports = {};
__export(GetUsers_exports, {
  default: () => GetUsers
});
module.exports = __toCommonJS(GetUsers_exports);
var GetUsers = class {
  _userRepository;
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  async execute() {
    const userList = await this._userRepository.get();
    if (userList.length === 0) {
      throw new Error("Lista est\xE1 vazia");
    }
    return userList;
  }
};
