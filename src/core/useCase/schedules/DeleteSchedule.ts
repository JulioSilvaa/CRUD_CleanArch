import SchedulesRepository from "src/core/repositories/ScheduleRepository";

export default class DeleteSchedule {
  _scheduleRepository: SchedulesRepository
  constructor(scheduleRepository: SchedulesRepository) {
    this._scheduleRepository = scheduleRepository;
  }

  async execute(id: string, userId: string) {
    const schedule = await this._scheduleRepository.find(id, userId)
    if (schedule === null) {
      throw new Error("Usuário sem permissão");
    }
    await this._scheduleRepository.delete(id, userId);
  }
}