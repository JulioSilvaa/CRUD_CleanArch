import { ISchedule } from "src/core/entities/ScheduleEntity";
import SchedulesRepository from "src/core/repositories/ScheduleRepository";


export default class CreateSchedules {
  _scheduleRepository: SchedulesRepository
  constructor(scheduleRepository: SchedulesRepository) {
    this._scheduleRepository = scheduleRepository;
  }

  async execute({ dateTime, schedulestatusId, serviceId, userId }: ISchedule) {
    await this._scheduleRepository.save({ dateTime, schedulestatusId, serviceId, userId });
  }
}
