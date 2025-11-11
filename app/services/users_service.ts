import User from '#models/user';

export default class UsersService {
  static async create(data: any) {
    return data;
  }

  static async list() {
    const users = await User.all();
    return users;
  }

  static async getUser(UserId: string) {
    const user = await User.findByOrFail('uuid', UserId);

    return user;
  }

  static async edit(data: any, user: User) {
    user.merge(data);
    await user.save();

    return user;
  }

  static async delete(UserId: string) {
    const user = await User.findByOrFail('uuid', UserId);
    await user.delete();

    return user;
  }
}
