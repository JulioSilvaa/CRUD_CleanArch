import { NextFunction, Request, Response } from "express";
import CreateService from "src/core/useCase/services/Create";
import DeleteService from "src/core/useCase/services/Delete";
import GetAllServices from "src/core/useCase/services/GetAll";
import ServicesRepositorySQL from "src/infra/repositorySQL/services/ServicesRepositorySQL";

export default class ServicesController {
  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user_id;
      const { name, price, description } = req.body;
      const serviceSQL = new ServicesRepositorySQL();
      const createNewService = new CreateService(serviceSQL);
      await createNewService.execute({ name, price, description, userId });
      res.status(201).json({ message: "Serviço adicionado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceSQL = new ServicesRepositorySQL();
      const serviceLIst = new GetAllServices(serviceSQL);
      const list = await serviceLIst.execute(req.user_id);

      if (list.length === 0) {
        res.status(200).json({ message: "Lista vazia" });
      }
      res.status(200).json({ data: list });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const serviceSQL = new ServicesRepositorySQL();
      const deleteService = new DeleteService(serviceSQL);
      await deleteService.execute(id);
      res.status(200).json({ message: "Serviço excluído com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
}
