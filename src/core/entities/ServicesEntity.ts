export interface IService {
  id?: string
  userId: string;
  name: string;
  price: string;
  description: string;
  createdAt?: Date;

}

export default class Services {
  id?: string;
  userId: string;
  name: string;
  price: string;
  description: string;
  createdAt?: Date;

  constructor(props: IService) {
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.price = props.price;
    this.description = props.description;
    this.createdAt = props.createdAt;

  }
}