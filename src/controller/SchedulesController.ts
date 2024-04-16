import { NextFunction, Request, Response } from "express";
import CreateSchedules from "src/core/useCase/schedules/CreateSchedule";
import DeleteSchedule from "src/core/useCase/schedules/DeleteSchedule";
import FindSchedule from "src/core/useCase/schedules/FindSchedule";
import GetAllSchedules from "src/core/useCase/schedules/GetAll";
import UpdateSchedule from "src/core/useCase/schedules/UpdateSchedule";
import ScheduleRepositorySQL from "src/infra/repositorySQL/schedule/ScheduleRepositorySQL";

export default class SchedulesController {
  static async save(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user_id;
      const { dateTime, schedulestatusId, serviceId } = req.body
      const scheduleSQL = new ScheduleRepositorySQL()
      const createSchedule = new CreateSchedules(scheduleSQL)
      await createSchedule.execute({ dateTime, schedulestatusId, serviceId, userId })
      res.status(201).json({ message: "Agendamento realizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user_id;
      const scheduleSQL = new ScheduleRepositorySQL()
      const getAllSchedule = new GetAllSchedules(scheduleSQL)
      const schedulesList = await getAllSchedule.execute(userId)
      res.status(200).json({ data: schedulesList })
    } catch (error) {
      next(error)
    }
  }

  static async find(req: Request, res: Response, next: NextFunction) {
    try {
      const idSchedule = req.params.id
      const userId = req.user_id
      const scheduleSQL = new ScheduleRepositorySQL()
      const schedulingFiltered = new FindSchedule(scheduleSQL)
      const scheduling = await schedulingFiltered.execute(idSchedule, userId)
      res.status(200).json({ data: scheduling })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const idSchedule = req.params.id
      const userId = req.user_id
      const scheduleSQL = new ScheduleRepositorySQL()
      const scheduleToDelete = new DeleteSchedule(scheduleSQL)
      await scheduleToDelete.execute(idSchedule, userId)
      res.status(201).json({ message: "Agendamento excluído com sucesso!" });
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const { dateTime, schedulestatusId, serviceId } = req.body
      const userId = req.user_id
      const scheduleSQL = new ScheduleRepositorySQL()
      const findSchedule = new FindSchedule(scheduleSQL)
      const schedule = await findSchedule.execute(id, userId)

      if (!schedule) {
        throw new Error("Impossivel encontrar agendamento")
      }

      const updateSchedule = new UpdateSchedule(scheduleSQL)
      await updateSchedule.execute({ id, userId, dateTime, schedulestatusId, serviceId })
      res.status(201).json({ message: "Agendamento atualizado com sucesso!" });
    } catch (error) {
      next(error)
    }
  }
}
