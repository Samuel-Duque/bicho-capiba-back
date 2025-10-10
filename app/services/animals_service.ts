import Animal from "#models/animal";
import Ong from "#models/ong";
import { DateTime } from "luxon";
import ImageUpload from "../helper/image_upload.js";

export default class AnimalsService {
    static async create(data: any, ong: Ong) {

        const ongId = ong.id
        const animal = new Animal()
        animal.nome = data.nome
        animal.idade = data.idade
        animal.sexo = data.sexo
        animal.porte = data.porte
        animal.cor = data.cor
        animal.especie = data.especie
        animal.raca = data.raca
        animal.dataNascimento = data.data_nascimento || null
        animal.vacinas = data.vacinas || null
        animal.castrado = data.castrado || null
        animal.necessidadesEspeciais = data.necessidades_especiais || null
        animal.historia = data.historia || null
        animal.statusAnimal = 'Disponivel'
        animal.sociavelAnimal = data.sociavel_animal || null
        animal.sociavelPessoa = data.sociavel_pessoa || null
        animal.ongId = ongId
        console.log(data)
        if (data.images) {
            console.log('has images')

            console.log(data.images)

            const imagePath = await ImageUpload.upload(data.images, 'animals')
            await animal.related('fotos').create({ url: imagePath, extname: ''})

            // Se quiser suportar múltiplas imagens no futuro

            // for (const image of data.images) {
            //     const imageName = await ImageUpload.upload(image, 'animals')
            //     console.log(imageName)
            //     await animal.related('fotos').create({ url: imageName })
            // }
        }

        await animal.save()

        return animal
    }

    static async getAnimal(animalId: string){
        const animal = await Animal.query().where('uuid', animalId).preload('fotos', (query) => {
            query.whereNull('deleted_at').select('id', 'url')
        }).preload('ong', (query) => {
            query.select('id', 'nome', 'email', 'telefone')
        }).firstOrFail()

        return animal
    }

    static async list(pagination: { page: number, limit: number }) {
        const animals = await Animal.query().select([
            'id', 'uuid', 'nome', 'idade', 'sexo', 'raca', 'ong_id'
        ])
            .whereNull('deleted_at')
            .preload('fotos', (query) => {
                query.whereNull('deleted_at').select('id', 'url')
            })
            .preload('ong', (query) => {
                query.select('id', 'nome', 'email', 'telefone','endereco')
            })
            .paginate(pagination.page, pagination.limit)

        return animals
    }

    static async edit(animalId: string, data: any) {
        const animal = await Animal.findByOrFail('uuid', animalId)

        if (data.images) {
            const imagePath = await ImageUpload.upload(data.images, 'animals')
            await animal.related('fotos').create({ url: imagePath, extname: '' })
        }

        animal.merge(data)
        await animal.save()

        return animal
    }

    static async delete(animalId: string) {
        const animal = await Animal.findByOrFail('uuid', animalId)
        animal.deletedAt = DateTime.now()
        
        await animal.save()

        return animal
    }

}