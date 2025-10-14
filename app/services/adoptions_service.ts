import Ong from "#models/ong";
import User from "#models/user";

export default class AdoptionsService {

    static async create (data: any, adopter: User, animalId: string){

    }

    static async listByOng(ong: Ong, pagination: { page: number; limit: number }) {
    const adoptions = await ong.related('adoptions').query().paginate(pagination.page, pagination.limit)
    
    return adoptions
    }
    static async listByUser(user: User, pagination: { page: number; limit: number }) {
    const adoptions = await user.related('adoptions').query().paginate(pagination.page, pagination.limit)

    return adoptions
    }
}