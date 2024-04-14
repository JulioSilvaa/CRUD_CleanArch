import { NextFunction, Request, Response } from "express";
import ServicesRepositorySQL from "src/infra/repositorySQL/services/ServicesRepositorySQL";

export default class ServicesController {
  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("REQ", req);
      const serviceSQL = new ServicesRepositorySQL();
      await serviceSQL.add(req.body);
      res.status(201).json({ message: "Serviço adicionado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceSQL = new ServicesRepositorySQL();
      const list = await serviceSQL.getAll(
        "a7cf3e54-fd05-4533-80ca-2a8419be7abc" //quando estiver logado passo o id
      );
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
      serviceSQL.delete(id);
      res.status(200).json({ message: "Serviço excluído com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
}
