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

// src/controller/userController.ts
var userController_exports = {};
__export(userController_exports, {
  default: () => UserController
});
module.exports = __toCommonJS(userController_exports);

// src/core/useCase/CreateUser.ts
var CreateUserUseCase = class {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({ name, email, phone, password }) {
      const user = yield this._userRepository.save({
        name,
        email,
        phone,
        password
      });
      return user;
    });
  }
};

// src/core/useCase/EditeUser.ts
var EditeUser = class {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  execute(user, dataBody) {
    return __async(this, null, function* () {
      yield this._userRepository.update(user, dataBody);
    });
  }
};

// src/core/useCase/GetUserByEmail.ts
var GetUserByEmail = class {
  constructor(userRepository) {
    this._useRepository = userRepository;
  }
  execute(email) {
    return __async(this, null, function* () {
      const user = yield this._useRepository.findByEmail(email);
      return user;
    });
  }
};

// src/core/useCase/GetUserById.ts
var GetUserById = class {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }
  execute(id) {
    return __async(this, null, function* () {
      const user = yield this._userRepository.findUserById(id);
      if (!user) {
        throw new Error("Usu\xE1rio n\xE3o cadastrado");
      }
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
      const user = yield prisma.user.findFirst({ where: { email } });
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
    });
  }
  findUserById(id) {
    return __async(this, null, function* () {
      const user = yield prisma.user.findUnique({ where: { id } });
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
    });
  }
  update(user, data) {
    return __async(this, null, function* () {
      const { id } = user;
      yield prisma.user.update({ where: { id }, data });
    });
  }
  deleteUser(id) {
    return __async(this, null, function* () {
      yield prisma.user.delete({ where: { id } });
    });
  }
  get() {
    return __async(this, null, function* () {
      const userList = yield prisma.user.findMany({
        orderBy: { createdAt: "desc" }
      });
      return userList;
    });
  }
};

// src/controller/userController.ts
var UserController = class {
  static add(params, body, res, next) {
    return __async(this, null, function* () {
      try {
        const userSQL = new UserRepositorySQL();
        const checkEmailExists = new GetUserByEmail(userSQL);
        const emailAlreadyExists = yield checkEmailExists.execute(body.email);
        if (emailAlreadyExists) {
          return res.status(400).json({ message: "Email j\xE1 est\xE1 em uso" });
        }
        const user = new CreateUserUseCase(userSQL);
        yield user.execute(body);
        return res.status(201).json({ message: "Usu\xE1rio criado com sucesso" });
      } catch (error) {
        next(error);
      }
    });
  }
  static findUserById(req, body, res, next) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const userSQL = new UserRepositorySQL();
        const getUserById = new GetUserById(userSQL);
        const user = yield getUserById.execute(id);
        return res.status(200).json({ data: user });
      } catch (error) {
        next(error);
      }
    });
  }
  static delete(req, body, res, next) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const userSQL = new UserRepositorySQL();
        const user = yield userSQL.findUserById(id);
        if (!user) {
          throw new Error("Usu\xE1rio n\xE3o encontrado");
        }
        yield userSQL.deleteUser(user.id);
        return res.status(200).json({ message: "Usu\xE1rio deletado com sucesso!" });
      } catch (error) {
        next(error);
      }
    });
  }
  static update(req, body, res, next) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const userSQL = new UserRepositorySQL();
        const user = yield userSQL.findUserById(id);
        if (!user) {
          throw new Error("Usu\xE1rio n\xE3o encontrado");
        }
        const editUser = new EditeUser(userSQL);
        editUser.execute(user, body);
        return res.status(200).json({ message: "Usu\xE1rio atualizado com sucesso!" });
      } catch (error) {
        next(error);
      }
    });
  }
  static getUsers(params, body, res, next) {
    return __async(this, null, function* () {
      try {
        const userSQL = new UserRepositorySQL();
        const user = new GetUsers(userSQL);
        const userLista = yield user.execute();
        return res.status(200).json({ userLista, quantity: userLista.length });
      } catch (error) {
        next(error);
      }
    });
  }
};
