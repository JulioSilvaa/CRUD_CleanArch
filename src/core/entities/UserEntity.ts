export interface IUserInterface {
  id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt?: Date;
}

export default class UserEntity {
  id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt?: Date;
  constructor(props: IUserInterface) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.password = props.password;
    this.createdAt = props.createdAt;
  }
}
