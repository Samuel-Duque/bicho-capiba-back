import User from "#models/user";

export default class UsersService {
    static async create(data: any) {
        return 0;
    }

    static async list(){
        const users = await User.all()
        return users
    }

    static async findUser(UserId: string){
        const user = await User.findByOrFail('uuid', UserId)
        return user
    }


}