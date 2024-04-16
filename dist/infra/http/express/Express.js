"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/infra/http/express/Express.ts
var import_express4 = __toESM(require("express"));

// src/infra/router/SchedulesRouter.ts
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

// src/core/useCase/schedules/CreateSchedule.ts
var CreateSchedules = class {
  _scheduleRepository;
  constructor(scheduleRepository) {
    this._scheduleRepository = scheduleRepository;
  }
  async execute({ dateTime, schedulestatusId, serviceId, userId }) {
    await this._scheduleRepository.save({ dateTime, schedulestatusId, serviceId, userId });
  }
};

// src/core/useCase/schedules/DeleteSchedule.ts
var DeleteSchedule = class {
  _scheduleRepository;
  constructor(scheduleRepository) {
    this._scheduleRepository = scheduleRepository;
  }
  async execute(id, userId) {
    const schedule = await this._scheduleRepository.find(id, userId);
    if (schedule === null) {
      throw new Error("Usu\xE1rio sem permiss\xE3o");
    }
    await this._scheduleRepository.delete(id, userId);
  }
};

// src/core/useCase/schedules/FindSchedule.ts
var FindSchedule = class {
  _scheduleRepository;
  constructor(scheduleRepository) {
    this._scheduleRepository = scheduleRepository;
  }
  async execute(id, userId) {
    const schedule = await this._scheduleRepository.find(id, userId);
    if (schedule === null) {
      throw new Error("Usu\xE1rio sem permiss\xE3o");
    }
    return schedule;
  }
};

// src/core/useCase/schedules/GetAll.ts
var GetAllSchedules = class {
  _scheduleRepository;
  constructor(scheduleRepository) {
    this._scheduleRepository = scheduleRepository;
  }
  async execute(id) {
    const schedulesListOfUserId = await this._scheduleRepository.getAll(id);
    if (!schedulesListOfUserId || schedulesListOfUserId.length === 0) {
      throw new Error("Lista de Agendamentos vazia");
    }
    return schedulesListOfUserId;
  }
};

// src/core/useCase/schedules/UpdateSchedule.ts
var UpdateSchedule = class {
  _scheduleRepository;
  constructor(scheduleRepository) {
    this._scheduleRepository = scheduleRepository;
  }
  async execute({ id, userId, dateTime, schedulestatusId, serviceId }) {
    await this._scheduleRepository.update({ id, userId, dateTime, schedulestatusId, serviceId });
  }
};

// src/infra/repositorySQL/schedule/ScheduleRepositorySQL.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var ScheduleRepositorySQL = class {
  async update({ id, userId, dateTime, schedulestatusId, serviceId }) {
    await prisma.schedules.update({ where: { id, userId }, data: { dateTime, schedulestatusId, serviceId } });
  }
  async delete(id, userId) {
    await prisma.schedules.delete({ where: { id, userId } });
  }
  async find(id, userId) {
    const schedule = await prisma.schedules.findUnique({ where: { id, userId }, select: { user: { select: { name: true, email: true, phone: true, id: true } }, service: { select: { name: true, price: true, description: true } }, schedulestatus: { select: { status: true } }, dateTime: true } });
    return schedule;
  }
  async getAll(id) {
    const schedulesList = await prisma.schedules.findMany({ where: { userId: id }, select: { user: { select: { name: true, email: true, phone: true } }, service: { select: { name: true, price: true, description: true } }, schedulestatus: { select: { status: true } }, dateTime: true } });
    return schedulesList;
  }
  async save({ dateTime, schedulestatusId, serviceId, userId }) {
    await prisma.schedules.create({
      data: {
        dateTime,
        schedulestatusId,
        serviceId,
        userId
      }
    });
  }
};

// src/controller/SchedulesController.ts
var SchedulesController = class {
  static async save(req, res, next) {
    try {
      const userId = req.user_id;
      const { dateTime, schedulestatusId, serviceId } = req.body;
      const scheduleSQL = new ScheduleRepositorySQL();
      const createSchedule = new CreateSchedules(scheduleSQL);
      await createSchedule.execute({ dateTime, schedulestatusId, serviceId, userId });
      res.status(201).json({ message: "Agendamento realizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req, res, next) {
    try {
      const userId = req.user_id;
      const scheduleSQL = new ScheduleRepositorySQL();
      const getAllSchedule = new GetAllSchedules(scheduleSQL);
      const schedulesList = await getAllSchedule.execute(userId);
      res.status(200).json({ data: schedulesList });
    } catch (error) {
      next(error);
    }
  }
  static async find(req, res, next) {
    try {
      const idSchedule = req.params.id;
      const userId = req.user_id;
      const scheduleSQL = new ScheduleRepositorySQL();
      const schedulingFiltered = new FindSchedule(scheduleSQL);
      const scheduling = await schedulingFiltered.execute(idSchedule, userId);
      res.status(200).json({ data: scheduling });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const idSchedule = req.params.id;
      const userId = req.user_id;
      const scheduleSQL = new ScheduleRepositorySQL();
      const scheduleToDelete = new DeleteSchedule(scheduleSQL);
      await scheduleToDelete.execute(idSchedule, userId);
      res.status(201).json({ message: "Agendamento exclu\xEDdo com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const { dateTime, schedulestatusId, serviceId } = req.body;
      const userId = req.user_id;
      const scheduleSQL = new ScheduleRepositorySQL();
      const findSchedule = new FindSchedule(scheduleSQL);
      const schedule = await findSchedule.execute(id, userId);
      if (!schedule) {
        throw new Error("Impossivel encontrar agendamento");
      }
      const updateSchedule = new UpdateSchedule(scheduleSQL);
      await updateSchedule.execute({ id, userId, dateTime, schedulestatusId, serviceId });
      res.status(201).json({ message: "Agendamento atualizado com sucesso!" });
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
router.get("/:id", AuthMiddleware_default.auth, ExpressAdapter.create(SchedulesController.find));
router.get("/", AuthMiddleware_default.auth, ExpressAdapter.create(SchedulesController.getAll));
router.delete("/:id", AuthMiddleware_default.auth, ExpressAdapter.create(SchedulesController.delete));
router.patch("/:id", AuthMiddleware_default.auth, ExpressAdapter.create(SchedulesController.update));
var SchedulesRouter_default = router;

// src/infra/router/ServicesRouter.ts
var import_express2 = require("express");

// src/core/useCase/services/Create.ts
var CreateService = class {
  _serviceRepository;
  constructor(servicesRepository) {
    this._serviceRepository = servicesRepository;
  }
  async execute({ name, price, description, userId }) {
    const service = await this._serviceRepository.add({ name, price, description, userId });
    return service;
  }
};

// src/core/useCase/services/Delete.ts
var DeleteService = class {
  _servicesRepository;
  constructor(servicesRepository) {
    this._servicesRepository = servicesRepository;
  }
  async execute(id) {
    await this._servicesRepository.delete(id);
  }
};

// src/core/useCase/services/GetAll.ts
var GetAllServices = class {
  _servicesRepository;
  constructor(serviceRepository) {
    this._servicesRepository = serviceRepository;
  }
  async execute(userId) {
    const servicesList = await this._servicesRepository.getAll(userId);
    return servicesList;
  }
};

// src/infra/repositorySQL/services/ServicesRepositorySQL.ts
var import_client2 = require("@prisma/client");
var prisma2 = new import_client2.PrismaClient();
var ServiceRepositorySQL = class {
  async delete(id) {
    await prisma2.service.delete({ where: { id } });
  }
  async getAll(userId) {
    const serviceList = await prisma2.service.findMany({
      select: { name: true, price: true, description: true },
      orderBy: { createdAt: "desc" }
    });
    return serviceList;
  }
  async add({ name, price, description, userId }) {
    await prisma2.service.create({ data: { name, price, description, userId } });
  }
};

// src/controller/ServicesController.ts
var ServicesController = class {
  static async add(req, res, next) {
    try {
      const userId = req.user_id;
      const { name, price, description } = req.body;
      const serviceSQL = new ServiceRepositorySQL();
      const createNewService = new CreateService(serviceSQL);
      await createNewService.execute({ name, price, description, userId });
      res.status(201).json({ message: "Servi\xE7o adicionado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req, res, next) {
    try {
      const serviceSQL = new ServiceRepositorySQL();
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
  static async delete(req, res, next) {
    try {
      const id = req.params.id;
      const serviceSQL = new ServiceRepositorySQL();
      const deleteService = new DeleteService(serviceSQL);
      await deleteService.execute(id);
      res.status(200).json({ message: "Servi\xE7o exclu\xEDdo com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
};

// src/infra/router/ServicesRouter.ts
var router2 = (0, import_express2.Router)();
router2.post(
  "/",
  AuthMiddleware_default.auth,
  ExpressAdapter.create(ServicesController.add)
);
router2.get("/", ExpressAdapter.create(ServicesController.getAll));
router2.delete("/:id", ExpressAdapter.create(ServicesController.delete));
var ServicesRouter_default = router2;

// src/infra/router/UserRouter.ts
var import_express3 = require("express");

// src/core/useCase/user/AuthUser.ts
var import_bcrypt = __toESM(require("bcrypt"));

// src/utils/generateToken.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
function generateAccessToken(id) {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("Access token failed");
  }
  return import_jsonwebtoken2.default.sign({ userId: id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "7d",
    subject: id
  });
}

// src/core/useCase/user/AuthUser.ts
var AuthUser = class {
  _userRepository;
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  async execute(email, password) {
    const userFound = await this._userRepository.findByEmail(email);
    if (!userFound) {
      throw new Error("Usu\xE1rio ou senha incorreto");
    }
    const passwordIsValid = await import_bcrypt.default.compare(password, userFound.password);
    if (!passwordIsValid) {
      throw new Error("Usu\xE1rio ou senha incorreto");
    }
    const AuthenticatedUser = {
      id: userFound.id,
      name: userFound.name,
      phone: userFound.phone,
      email: userFound.email
    };
    const token = generateAccessToken(AuthenticatedUser.id);
    return {
      ...AuthenticatedUser,
      token
    };
  }
};

// src/core/useCase/user/CreateUser.ts
var import_bcrypt2 = __toESM(require("bcrypt"));
var CreateUserUseCase = class {
  _userRepository;
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  async execute({ name, email, password, phone }) {
    const numberOfSalt = 14;
    const passwordHash = await import_bcrypt2.default.hash(password, numberOfSalt);
    const user = await this._userRepository.save({
      name,
      email,
      phone,
      password: passwordHash
    });
    return user;
  }
};

// src/core/useCase/user/EditeUser.ts
var EditeUser = class {
  _userRepository;
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  async execute(user, dataBody) {
    await this._userRepository.update(user, dataBody);
  }
};

// src/core/useCase/user/GetUserByEmail.ts
var GetUserByEmail = class {
  _useRepository;
  constructor(userRepository) {
    this._useRepository = userRepository;
  }
  async execute(email) {
    const user = await this._useRepository.findByEmail(email);
    return user;
  }
};

// src/core/useCase/user/GetUserById.ts
var GetUserById = class {
  _userRepository;
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  async execute(id) {
    const user = await this._userRepository.findUserById(id);
    if (!user) {
      throw new Error("Usu\xE1rio n\xE3o cadastrado");
    }
    return user;
  }
};

// src/core/useCase/user/GetUsers.ts
var GetUsers = class {
  _userRepository;
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  async execute() {
    const userList = await this._userRepository.get();
    return userList;
  }
};

// src/infra/repositorySQL/user/UserRepositorySQL.ts
var import_client3 = require("@prisma/client");

// src/core/entities/UserEntity.ts
var UserEntity = class {
  id;
  name;
  email;
  phone;
  password;
  createdAt;
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.password = props.password;
    this.createdAt = props.createdAt;
  }
};

// src/adapters/userAdapter.ts
var UserAdapter = class {
  static async create({
    id,
    name,
    email,
    phone,
    password,
    createdAt
  }) {
    return new UserEntity({ id, name, email, phone, password, createdAt });
  }
};

// src/infra/repositorySQL/user/UserRepositorySQL.ts
var prisma3 = new import_client3.PrismaClient();
var UserRepositorySQL = class {
  async save({ name, email, phone, password }) {
    await prisma3.user.create({ data: { name, email, phone, password } });
  }
  async findByEmail(email) {
    const user = await prisma3.user.findFirst({ where: { email } });
    if (!user) {
      return null;
    }
    return UserAdapter.create({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      createdAt: user.createdAt
    });
  }
  async findUserById(id) {
    const user = await prisma3.user.findUnique({ where: { id } });
    if (!user) {
      return null;
    }
    return UserAdapter.create({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt
    });
  }
  async update(user, data) {
    const { id } = user;
    await prisma3.user.update({ where: { id }, data });
  }
  async deleteUser(id) {
    await prisma3.user.delete({ where: { id } });
  }
  async get() {
    const userList = await prisma3.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true
      },
      orderBy: { createdAt: "desc" }
    });
    return userList;
  }
};

// src/controller/userController.ts
var UserController = class {
  static async add(req, res, next) {
    try {
      const userSQL = new UserRepositorySQL();
      const checkEmailExists = new GetUserByEmail(userSQL);
      const emailAlreadyExists = await checkEmailExists.execute(req.body.email);
      if (emailAlreadyExists) {
        return res.status(400).json({ message: "Email j\xE1 est\xE1 em uso" });
      }
      const user = new CreateUserUseCase(userSQL);
      await user.execute(req.body);
      return res.status(201).json({ message: "Usu\xE1rio criado com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  static async findUserById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("Usu\xE1rio n\xE3o encontrado");
      }
      const userSQL = new UserRepositorySQL();
      const getUserById = new GetUserById(userSQL);
      const user = await getUserById.execute(id);
      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
  static async search(req, res, next) {
    try {
      const { id } = req.query;
      if (!id) {
        throw new Error("Usu\xE1rio n\xE3o encontrado");
      }
      const userSQL = new UserRepositorySQL();
      const getUserById = new GetUserById(userSQL);
      const user = await getUserById.execute(id);
      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userSQL = new UserRepositorySQL();
      const user = await userSQL.findUserById(id);
      if (!user) {
        throw new Error("Usu\xE1rio n\xE3o encontrado");
      }
      await userSQL.deleteUser(user.id);
      return res.status(200).json({ message: "Usu\xE1rio exclu\xEDdo com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const userSQL = new UserRepositorySQL();
      const user = await userSQL.findUserById(id);
      if (!user) {
        throw new Error("Usu\xE1rio n\xE3o encontrado");
      }
      const editUser = new EditeUser(userSQL);
      editUser.execute(user, req.body);
      return res.status(200).json({ message: "Usu\xE1rio atualizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async getUsers(req, res, next) {
    try {
      const userSQL = new UserRepositorySQL();
      const user = new GetUsers(userSQL);
      const data = await user.execute();
      if (data.length === 0) {
        res.status(200).json({ message: "Lista vazia" });
      }
      return res.status(200).json({ data, total: data.length });
    } catch (error) {
      next(error);
    }
  }
  static async auth(req, res, next) {
    try {
      const userSQL = new UserRepositorySQL();
      const userAuthenticated = new AuthUser(userSQL);
      const userData = await userAuthenticated.execute(
        req.body.email,
        req.body.password
      );
      return res.status(200).json({ userData });
    } catch (error) {
      next(error);
    }
  }
};

// src/infra/router/UserRouter.ts
var router3 = (0, import_express3.Router)();
router3.get("/search", ExpressAdapter.create(UserController.search));
router3.get("/:id", ExpressAdapter.create(UserController.findUserById));
router3.delete("/:id", ExpressAdapter.create(UserController.delete));
router3.patch("/:id", ExpressAdapter.create(UserController.update));
router3.post("/auth", ExpressAdapter.create(UserController.auth));
router3.get("/", ExpressAdapter.create(UserController.getUsers));
router3.post("/", ExpressAdapter.create(UserController.add));
var UserRouter_default = router3;

// src/infra/http/express/Express.ts
var app = (0, import_express4.default)();
var port = process.env.PORT || 3e3;
app.use(import_express4.default.json());
app.use(import_express4.default.urlencoded({ extended: true }));
app.use("/api/user", UserRouter_default);
app.use("/api/service", ServicesRouter_default);
app.use("/api/schedule", SchedulesRouter_default);
app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({ error: "Internal Server Error" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
