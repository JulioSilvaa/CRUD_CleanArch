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

// src/infra/UserRepositoryInMemory/UserRepositoryInMemory.ts
var UserRepositoryInMemory_exports = {};
__export(UserRepositoryInMemory_exports, {
  default: () => UserRepositoryInMemory
});
module.exports = __toCommonJS(UserRepositoryInMemory_exports);

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

// src/infra/UserRepositoryInMemory/UserRepositoryInMemory.ts
var UserRepositoryInMemory = class {
  constructor() {
    this.userList = [
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
  }
  findUserById(id) {
    const user = this.userList.find((user2) => user2.id === id);
    return user;
  }
  deleteUser(id) {
    return __async(this, null, function* () {
      this.userList.filter((user) => user.id === id);
    });
  }
  findByEmail(email) {
    return __async(this, null, function* () {
      const user = yield this.userList.find((user2) => user2.email === email);
      const userToAdapter = UserAdapter.create(user);
      return userToAdapter;
    });
  }
  get() {
    return __async(this, null, function* () {
      const users = yield this.userList;
      return users;
    });
  }
  save(_0) {
    return __async(this, arguments, function* ({ name, email }) {
      this.userList.push({ name, email });
    });
  }
};
