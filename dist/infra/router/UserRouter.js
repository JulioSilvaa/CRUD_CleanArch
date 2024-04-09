"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

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
    return function(req, res, next) {
      return __async(this, null, function* () {
        const { status, obj } = yield fn(req.params, req.body);
        try {
          res.status(status).json(obj);
        } catch (error) {
          next(error);
        }
      });
    };
  }
};

// src/core/useCase/CreateUser.ts
var CreateUserUseCase = class {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({ name, email, phone, password }) {
      const emailExists = yield this._userRepository.findByEmail(email);
      if (emailExists) {
        console.log("E-mail already exists");
      }
      const user = yield this._userRepository.save({ name, email, phone, password });
      return user;
    });
  }
};

// src/core/useCase/GetUsers.ts
var GetUsers = class {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  execute() {
    return __async(this, null, function* () {
      const userList = yield this._userRepository.get();
      if (userList.length === 0) {
        console.log("Lista est\xE1 vazia");
      }
      return userList;
    });
  }
};

// src/infra/repositorySQL/UserRepositorySQL.ts
var import_client = require("@prisma/client");

// src/core/entities/UserEntity.ts
var UserEntity = class {
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
  static create(_0) {
    return __async(this, arguments, function* ({
      id,
      name,
      email,
      phone,
      password,
      createdAt
    }) {
      return new UserEntity({ id, name, email, phone, password, createdAt });
    });
  }
};

// src/infra/repositorySQL/UserRepositorySQL.ts
var prisma = new import_client.PrismaClient();
var UserRepositorySQL = class {
  save(_0) {
    return __async(this, arguments, function* ({ name, email, phone, password }) {
      prisma.user.create({ data: { name, email, phone, password } });
    });
  }
  findByEmail(email) {
    return __async(this, null, function* () {
      const user = yield prisma.user.findUnique({ where: { email } });
      if (user) {
        return UserAdapter.create({
          id: user == null ? void 0 : user.id,
          name: user == null ? void 0 : user.name,
          email: user == null ? void 0 : user.email,
          phone: user == null ? void 0 : user.phone,
          password: user == null ? void 0 : user.password,
          createdAt: user == null ? void 0 : user.createdAt
        });
      } else {
        return null;
      }
    });
  }
  getUserById(id) {
    return __async(this, null, function* () {
      const user = yield prisma.user.findUnique({ where: { id } });
      if (user) {
        return UserAdapter.create({
          id: user == null ? void 0 : user.id,
          name: user == null ? void 0 : user.name,
          email: user == null ? void 0 : user.email,
          phone: user == null ? void 0 : user.phone,
          password: user == null ? void 0 : user.password,
          createdAt: user == null ? void 0 : user.createdAt
        });
      } else {
        console.log("ByID sem User");
      }
    });
  }
  get() {
    return __async(this, null, function* () {
      const userList = yield prisma.user.findMany({ orderBy: { createdAt: "desc" } });
      return userList;
    });
  }
};

// src/controller/userController.ts
var UserController = class {
  static getUsers(params, body) {
    return __async(this, null, function* () {
      const userSQL = new UserRepositorySQL();
      const user = new GetUsers(userSQL);
      const userLista = yield user.execute();
      return { status: 200, obj: { data: userLista } };
    });
  }
  static add(params, body) {
    return __async(this, null, function* () {
      const userSQL = new UserRepositorySQL();
      const user = new CreateUserUseCase(userSQL);
      yield user.execute(body);
      return { status: 201, data: { message: "Usu\xE1rio criado com sucesso" } };
    });
  }
};

// src/infra/router/UserRouter.ts
var router = (0, import_express.Router)();
router.get("/", ExpressAdapter.create(UserController.getUsers));
router.post("/", ExpressAdapter.create(UserController.add));
var UserRouter_default = router;
