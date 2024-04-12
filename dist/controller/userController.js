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

// src/controller/userController.ts
var userController_exports = {};
__export(userController_exports, {
  default: () => UserController
});
module.exports = __toCommonJS(userController_exports);

// src/core/useCase/CreateUser.ts
var import_bcrypt = __toESM(require("bcrypt"));
var CreateUserUseCase = class {
  _userRepository;
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  async execute({ name, email, password, phone }) {
    const numberOfSalt = 14;
    const passwordHash = await import_bcrypt.default.hash(password, numberOfSalt);
    const user = await this._userRepository.save({
      name,
      email,
      phone,
      password: passwordHash
    });
    return user;
  }
};

// src/core/useCase/EditeUser.ts
var EditeUser = class {
  _userRepository;
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  async execute(user, dataBody) {
    await this._userRepository.update(user, dataBody);
  }
};

// src/core/useCase/GetUserByEmail.ts
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

// src/core/useCase/GetUserById.ts
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

// src/core/useCase/GetUsers.ts
var GetUsers = class {
  _userRepository;
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  async execute() {
    const userList = await this._userRepository.get();
    if (userList.length === 0) {
      console.log("Lista est\xE1 vazia");
    }
    return userList;
  }
};

// src/infra/repositorySQL/UserRepositorySQL.ts
var import_client = require("@prisma/client");

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

// src/infra/repositorySQL/UserRepositorySQL.ts
var prisma = new import_client.PrismaClient();
var UserRepositorySQL = class {
  async save({ name, email, phone, password }) {
    await prisma.user.create({ data: { name, email, phone, password } });
  }
  async findByEmail(email) {
    const user = await prisma.user.findFirst({ where: { email } });
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
  async findUserById(id) {
    const user = await prisma.user.findUnique({ where: { id } });
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
    await prisma.user.update({ where: { id }, data });
  }
  async deleteUser(id) {
    await prisma.user.delete({ where: { id } });
  }
  async get() {
    const userList = await prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true, createdAt: true },
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
      const userLista = await user.execute();
      return res.status(200).json({ userLista, quantity: userLista.length });
    } catch (error) {
      next(error);
    }
  }
};
