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

// src/controller/SchedulesController.ts
var SchedulesController_exports = {};
__export(SchedulesController_exports, {
  default: () => SchedulesController
});
module.exports = __toCommonJS(SchedulesController_exports);

// src/core/useCase/schedules/CreateSchedule.ts
var CreateSchedules = class {
  _scheduleRepository;
  constructor(scheduleRepository) {
    this._scheduleRepository = scheduleRepository;
  }
  async execute({ dateTime, schedulestatusId, serviceId, userId }) {
    await this._scheduleRepository.save({ dateTime, schedulestatusId, serviceId, userId });
  }
};

// src/core/useCase/schedules/DeleteSchedule.ts
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

// src/core/useCase/schedules/FindSchedule.ts
var FindSchedule = class {
  _scheduleRepository;
  constructor(scheduleRepository) {
    this._scheduleRepository = scheduleRepository;
  }
  async execute(id, userId) {
    const schedule = await this._scheduleRepository.find(id, userId);
    if (schedule === null) {
      throw new Error("Usu\xE1rio sem permiss\xE3o");
    }
    return schedule;
  }
};

// src/core/useCase/schedules/GetAll.ts
var GetAllSchedules = class {
  _scheduleRepository;
  constructor(scheduleRepository) {
    this._scheduleRepository = scheduleRepository;
  }
  async execute(id) {
    const schedulesListOfUserId = await this._scheduleRepository.getAll(id);
    if (!schedulesListOfUserId || schedulesListOfUserId.length === 0) {
      throw new Error("Lista de Agendamentos vazia");
    }
    return schedulesListOfUserId;
  }
};

// src/core/useCase/schedules/UpdateSchedule.ts
var UpdateSchedule = class {
  _scheduleRepository;
  constructor(scheduleRepository) {
    this._scheduleRepository = scheduleRepository;
  }
  async execute({ id, userId, dateTime, schedulestatusId, serviceId }) {
    await this._scheduleRepository.update({ id, userId, dateTime, schedulestatusId, serviceId });
  }
};

// src/infra/repositorySQL/schedule/ScheduleRepositorySQL.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var ScheduleRepositorySQL = class {
  async update({ id, userId, dateTime, schedulestatusId, serviceId }) {
    await prisma.schedules.update({ where: { id, userId }, data: { dateTime, schedulestatusId, serviceId } });
  }
  async delete(id, userId) {
    await prisma.schedules.delete({ where: { id, userId } });
  }
  async find(id, userId) {
    const schedule = await prisma.schedules.findUnique({ where: { id, userId }, select: { user: { select: { name: true, email: true, phone: true, id: true } }, service: { select: { name: true, price: true, description: true } }, schedulestatus: { select: { status: true } }, dateTime: true } });
    return schedule;
  }
  async getAll(id) {
    const schedulesList = await prisma.schedules.findMany({ where: { userId: id }, select: { user: { select: { name: true, email: true, phone: true } }, service: { select: { name: true, price: true, description: true } }, schedulestatus: { select: { status: true } }, dateTime: true } });
    return schedulesList;
  }
  async save({ dateTime, schedulestatusId, serviceId, userId }) {
    await prisma.schedules.create({
      data: {
        dateTime,
        schedulestatusId,
        serviceId,
        userId
      }
    });
  }
};

// src/controller/SchedulesController.ts
var SchedulesController = class {
  static async save(req, res, next) {
    try {
      const userId = req.user_id;
      const { dateTime, schedulestatusId, serviceId } = req.body;
      const scheduleSQL = new ScheduleRepositorySQL();
      const createSchedule = new CreateSchedules(scheduleSQL);
      await createSchedule.execute({ dateTime, schedulestatusId, serviceId, userId });
      res.status(201).json({ message: "Agendamento realizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req, res, next) {
    try {
      const userId = req.user_id;
      const scheduleSQL = new ScheduleRepositorySQL();
      const getAllSchedule = new GetAllSchedules(scheduleSQL);
      const schedulesList = await getAllSchedule.execute(userId);
      res.status(200).json({ data: schedulesList });
    } catch (error) {
      next(error);
    }
  }
  static async find(req, res, next) {
    try {
      const idSchedule = req.params.id;
      const userId = req.user_id;
      const scheduleSQL = new ScheduleRepositorySQL();
      const schedulingFiltered = new FindSchedule(scheduleSQL);
      const scheduling = await schedulingFiltered.execute(idSchedule, userId);
      res.status(200).json({ data: scheduling });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const idSchedule = req.params.id;
      const userId = req.user_id;
      const scheduleSQL = new ScheduleRepositorySQL();
      const scheduleToDelete = new DeleteSchedule(scheduleSQL);
      await scheduleToDelete.execute(idSchedule, userId);
      res.status(201).json({ message: "Agendamento exclu\xEDdo com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const { dateTime, schedulestatusId, serviceId } = req.body;
      const userId = req.user_id;
      const scheduleSQL = new ScheduleRepositorySQL();
      const findSchedule = new FindSchedule(scheduleSQL);
      const schedule = await findSchedule.execute(id, userId);
      if (!schedule) {
        throw new Error("Impossivel encontrar agendamento");
      }
      const updateSchedule = new UpdateSchedule(scheduleSQL);
      await updateSchedule.execute({ id, userId, dateTime, schedulestatusId, serviceId });
      res.status(201).json({ message: "Agendamento atualizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
};
