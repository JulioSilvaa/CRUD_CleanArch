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

// src/core/useCase/schedules/DeleteSchedule.ts
var DeleteSchedule_exports = {};
__export(DeleteSchedule_exports, {
  default: () => DeleteSchedule
});
module.exports = __toCommonJS(DeleteSchedule_exports);
var DeleteSchedule = class {
  _scheduleRepository;
  constructor(scheduleRepository) {
    this._scheduleRepository = scheduleRepository;
  }
  async execute(id, userId) {
    const schedule = await this._scheduleRepository.find(id, userId);
    if (schedule === null) {
      throw new Error("Usu\xE1rio sem permiss\xE3o");
    }
    await this._scheduleRepository.delete(id, userId);
  }
};
