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

// src/infra/repositorySQL/user/UserRepositorySQL.ts
var UserRepositorySQL_exports = {};
__export(UserRepositorySQL_exports, {
  default: () => UserRepositorySQL,
  prisma: () => prisma
});
module.exports = __toCommonJS(UserRepositorySQL_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  prisma
});
