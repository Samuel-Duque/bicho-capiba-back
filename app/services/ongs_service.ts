import Ong from "#models/ong";
import { DateTime } from "luxon";
import AppError from "../helper/app_error.js";
import ImageUpload from "../helper/image_upload.js";
import CacheManager from "../helper/cache_manager.js";

export default class OngsService {
    static async create(data: any) {        
        const existingOng = await Ong.query().where('cnpj', data.cnpj).first()

        if (existingOng){
            throw AppError.E_UNPROCESSABLE_ENTITY('CNPJ already registered');
        }

        const ong = new Ong()
        ong.nome = data.name
        ong.email = data.email
        ong.password = data.password
        ong.CEP = data.cep
        ong.cnpj = data.cnpj
        ong.telefone = data.telefone
        
        if (data.image) {
            const imagePath = await ImageUpload.upload(data.image)
            ong.imagem_perfil = imagePath
        }

        await ong.save()
        return ong;
    }

    static async getOng(OngId: string){
        const cacheKey = `ong:${OngId}`;
        const cachedOng = await CacheManager.get(cacheKey);

        if (cachedOng) {
            return cachedOng;
        }
     
        const ong = await Ong.query().where('uuid', OngId).preload('animals').firstOrFail()
        await CacheManager.create(cacheKey, JSON.stringify(ong));

        return ong;
    }

    static async list(pagination: { page: number, limit: number }) {
        const ongs = await Ong.query()
            .whereNull('deleted_at')
            .preload('animals')
            .paginate(pagination.page, pagination.limit)

        return ongs;
    }

    static async edit(OngId: string, data: any) {}

    static async delete(OngId: string) {
        const ong = await Ong.findByOrFail('uuid', OngId)
        ong.deletedAt = DateTime.now()
        await ong.save()
        return ong;
    }
}