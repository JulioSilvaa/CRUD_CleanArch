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

// src/infra/router/UserRouter.ts
var UserRouter_exports = {};
__export(UserRouter_exports, {
  default: () => UserRouter_default
});
module.exports = __toCommonJS(UserRouter_exports);
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

// src/core/useCase/user/AuthUser.ts
var import_bcrypt = __toESM(require("bcrypt"));

// src/utils/generateToken.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
function generateAccessToken(id) {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("Access token failed");
  }
  return import_jsonwebtoken.default.sign({ userId: id }, process.env.JWT_ACCESS_SECRET, {
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

// src/infra/repositorySQL/user/UserRepositorySQL.ts
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
      password: user.password,
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
var router = (0, import_express.Router)();
router.get("/search", ExpressAdapter.create(UserController.search));
router.get("/:id", ExpressAdapter.create(UserController.findUserById));
router.delete("/:id", ExpressAdapter.create(UserController.delete));
router.patch("/:id", ExpressAdapter.create(UserController.update));
router.post("/auth", ExpressAdapter.create(UserController.auth));
router.get("/", ExpressAdapter.create(UserController.getUsers));
router.post("/", ExpressAdapter.create(UserController.add));
var UserRouter_default = router;
