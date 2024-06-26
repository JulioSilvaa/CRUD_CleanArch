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

// src/core/useCase/schedules/CreateSchedule.ts
var CreateSchedule_exports = {};
__export(CreateSchedule_exports, {
  default: () => CreateSchedules
});
module.exports = __toCommonJS(CreateSchedule_exports);
var CreateSchedules = class {
  _scheduleRepository;
  constructor(scheduleRepository) {
    this._scheduleRepository = scheduleRepository;
  }
  async execute({ dateTime, schedulestatusId, serviceId, userId }) {
    await this._scheduleRepository.save({ dateTime, schedulestatusId, serviceId, userId });
  }
};
