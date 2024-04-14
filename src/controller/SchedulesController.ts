import { NextFunction, Request, Response } from "express";
import CreateSchedules from "src/core/useCase/schedules/CreateSchedule";

export default class SchedulesController {
  static async save(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user_id;
      console.log(user)
      // const userTokenAuth = req.headers.authorization;
      // const serviceData = req.body;
      // const createSchedule = new CreateSchedules();
      // createSchedule.execute({ userTokenAuth, serviceData });
      res.status(201).json({ message: "Serviço adicionado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
}
