import { ISchedule } from "../entities/ScheduleEntity";

export default interface SchedulesRepository {
  save({ dateTime, schedulestatusId, serviceId, userId }: ISchedule): Promise<void>;
  getAll(id: string): Promise<ISchedule[]>
  find(id: string, userId: string): Promise<ISchedule>
  delete(id: string, userId: string): Promise<void>
  update({ id, userId, dateTime, schedulestatusId, serviceId }: ISchedule): Promise<void>
}
