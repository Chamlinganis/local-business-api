import { IUser, User } from "@/models/user.model";
import { BaseRepository } from "@/repository/base.repository";

export class UserService extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findUserbyEmail(email: string) {
    const user = await this.findOne({ email });

    return user;
  }
}
