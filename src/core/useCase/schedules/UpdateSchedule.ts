import { ISchedule } from "src/core/entities/ScheduleEntity";
import SchedulesRepository from "src/core/repositories/ScheduleRepository";

export default class UpdateSchedule {
  _scheduleRepository: SchedulesRepository
  constructor(scheduleRepository: SchedulesRepository) {
    this._scheduleRepository = scheduleRepository;
  }

  async execute({ id, userId, dateTime, schedulestatusId, serviceId }: ISchedule) {
    await this._scheduleRepository.update({ id, userId, dateTime, schedulestatusId, serviceId });
  }
}