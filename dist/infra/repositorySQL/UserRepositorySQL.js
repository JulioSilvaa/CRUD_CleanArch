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

// src/infra/repositorySQL/UserRepositorySQL.ts
var UserRepositorySQL_exports = {};
__export(UserRepositorySQL_exports, {
  default: () => UserRepositorySQL,
  prisma: () => prisma
});
module.exports = __toCommonJS(UserRepositorySQL_exports);
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
      return { userList, quantity: userList.length };
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  prisma
});
