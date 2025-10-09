import Animal from "#models/animal";

export default class AnimalsService {
    static async create(){}

    static async getAnimal(){}

    static async list(pagination: { page: number, limit: number }) {
        const animals = await Animal.query()
            .whereNull('deleted_at')
            .preload('ong')
            .paginate(pagination.page, pagination.limit)

        return animals
    }
    
    static async edit(){}

    static async delete(){}

}