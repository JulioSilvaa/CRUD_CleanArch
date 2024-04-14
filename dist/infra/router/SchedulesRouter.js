"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/infra/router/SchedulesRouter.ts
var SchedulesRouter_exports = {};
__export(SchedulesRouter_exports, {
  default: () => SchedulesRouter_default
});
module.exports = __toCommonJS(SchedulesRouter_exports);
var import_express = require("express");

// src/adapters/ExpressAdapter.ts
var ExpressAdapter = class {
  static create(fn) {
    return async function(req, res, next) {
      const obj = await fn(req, res, next);
      try {
        return obj;
      } catch (error) {
        return error;
      }
    };
  }
};

// src/controller/SchedulesController.ts
var SchedulesController = class {
  static async save(req, res, next) {
    try {
      const user = req.user_id;
      console.log(user);
      res.status(201).json({ message: "Servi\xE7o adicionado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
};

// src/middlewares/AuthMiddleware.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var AuthMiddleware = class {
  auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.send(401);
    }
    const [, token] = authHeader.split(" ");
    if (!token) {
      return res.send(401);
    }
    if (process.env.JWT_ACCESS_SECRET)
      try {
        const { sub } = import_jsonwebtoken.default.verify(
          token,
          process.env.JWT_ACCESS_SECRET
        );
        req.user_id = sub;
        next();
      } catch (error) {
        return res.status(500).json({ message: error });
      }
  }
};
var AuthMiddleware_default = new AuthMiddleware();

// src/infra/router/SchedulesRouter.ts
var router = (0, import_express.Router)();
router.post(
  "/",
  AuthMiddleware_default.auth,
  ExpressAdapter.create(SchedulesController.save)
);
var SchedulesRouter_default = router;
