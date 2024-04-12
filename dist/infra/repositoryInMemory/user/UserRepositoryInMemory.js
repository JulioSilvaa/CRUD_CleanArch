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

// src/infra/repositoryInMemory/user/UserRepositoryInMemory.ts
var UserRepositoryInMemory_exports = {};
__export(UserRepositoryInMemory_exports, {
  default: () => UserRepositoryInMemory
});
module.exports = __toCommonJS(UserRepositoryInMemory_exports);

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

// src/infra/repositoryInMemory/user/UserRepositoryInMemory.ts
var UserRepositoryInMemory = class {
  userList = [
    {
      id: "1",
      name: "Julio",
      email: "julio@teste",
      phone: "234234234",
      password: "435345"
    },
    {
      id: "2",
      name: "Luan",
      email: "luan@teste.com",
      phone: "234234234",
      password: "435345"
    }
  ];
  findUserById(id) {
    const user = this.userList.find((user2) => user2.id === id);
    return user;
  }
  async deleteUser(id) {
    this.userList.filter((user) => user.id === id);
  }
  async findByEmail(email) {
    const user = await this.userList.find((user2) => user2.email === email);
    const userToAdapter = UserAdapter.create(user);
    return userToAdapter;
  }
  update({ name, email, phone, password }) {
    throw new Error("Method not implemented.");
  }
  async get() {
    const users = await this.userList;
    return users;
  }
  async save({ name, email }) {
    this.userList.push({ name, email });
  }
};
