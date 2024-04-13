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

// src/core/entities/ServicesEntity.ts
var ServicesEntity_exports = {};
__export(ServicesEntity_exports, {
  default: () => Services
});
module.exports = __toCommonJS(ServicesEntity_exports);
var Services = class {
  id;
  userId;
  name;
  price;
  description;
  createdAt;
  constructor(props) {
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.price = props.price;
    this.description = props.description;
    this.createdAt = props.createdAt;
  }
};
