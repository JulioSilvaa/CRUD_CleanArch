import SchedulesRepository from "src/core/repositories/ScheduleRepository";

export default class GetAllSchedules {
  _scheduleRepository: SchedulesRepository
  constructor(scheduleRepository: SchedulesRepository) {
    this._scheduleRepository = scheduleRepository;
  }

  async execute(id: string) {
    const schedulesListOfUserId = await this._scheduleRepository.getAll(id)
    if (!schedulesListOfUserId || schedulesListOfUserId.length === 0) {
      throw new Error("Lista de Agendamentos vazia");
    }
    return schedulesListOfUserId
  }

}