import { NextFunction, Request, Response } from "express";

export default class ExpressAdapter {
  static create(fn: any) {
    return async function (req: Request, res: Response, next: NextFunction) {
      const {status, obj} = await fn(req.params, req.body);
      try {
        res.status(status).json(obj);
      } catch (error) {
        next(error);
      }
    };
  }
}
