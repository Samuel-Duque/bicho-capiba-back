import User from "#models/user";

export default class UsersService {
    static async create(data: any) {
        return data;
    }

    static async list(){
        const users = await User.all()
        return users
    }

    static async getUser(UserId: string){
        const user = await User.findByOrFail('uuid', UserId)

        
        return user
    }


}