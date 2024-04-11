import { NextFunction, Request, Response } from "express";

export default class ExpressAdapter {
  static create(fn: any) {
    return async function (req: Request, res: Response, next: NextFunction) {
      const obj = await fn(req, req.body, res, next);
      try {
        return obj;
      } catch (error) {
        return error;
      }
    };
  }
}
