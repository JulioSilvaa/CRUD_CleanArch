import UserRepository from "../repositories/UserRepository";

export default class DeleteUser {

  constructor(private userRespository: UserRepository) {

  }

  async execute(id: string): Promise<void> {

    const userdeleted = await this.userRespository.deleteUser(id)
    return userdeleted


  }
} 