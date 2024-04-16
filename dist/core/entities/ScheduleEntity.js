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

// src/core/entities/ScheduleEntity.ts
var ScheduleEntity_exports = {};
__export(ScheduleEntity_exports, {
  default: () => ScheduleEntity
});
module.exports = __toCommonJS(ScheduleEntity_exports);
var ScheduleEntity = class {
  id;
  dateTime;
  userId;
  serviceId;
  schedulestatusId;
  constructor(props) {
    this.id = props.id;
    this.dateTime = props.dateTime;
    this.userId = props.userId;
    this.serviceId = props.serviceId;
    this.schedulestatusId = props.schedulestatusId;
  }
};
