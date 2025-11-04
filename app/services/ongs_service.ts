import Ong from '#models/ong';
import { DateTime } from 'luxon';
import AppError from '../helpers/app_error.js';
import ImageUpload from '../helpers/image_upload.js';
import CacheManager from '../helpers/cache_manager.js';
import brazilFinder from '../helpers/brazil_finder.js';

export default class OngsService {
  static async create(data: any) {
    const existingOng = await Ong.query().where('cnpj', data.cnpj).first();
    console.log(existingOng);
    if (existingOng) {
      throw AppError.E_CONFLICT('CNPJ already registered');
    }

    console.log(data);
    const isValidCnpj = await brazilFinder.cnpjFinder(data.cnpj);
    console.log(isValidCnpj);
    if (!isValidCnpj) {
      throw AppError.E_UNPROCESSABLE_ENTITY('Invalid CNPJ');
    }

    const ong = new Ong();
    ong.nome = data.name;
    ong.email = data.email;
    ong.password = data.password;
    ong.cep = data.cep;
    ong.cnpj = data.cnpj;
    ong.rua = data.rua;
    ong.bairro = data.bairro;
    ong.cidade = data.cidade;
    ong.estado = data.estado;
    ong.numero = data.numero;
    ong.complemento = data.complemento || null;
    ong.descricao = data.descricao || null;
    ong.latitude = data.latitude || null;
    ong.longitude = data.longitude || null;
    ong.responsavelTecnico = data.responsavelTecnico || null;
    ong.quantidadeAnimais = data.quantidadeAnimais || 0;
    ong.telefone = data.telefone;

    if (data.images) {
      const imagePath = await ImageUpload.upload(data.images, 'ongs');
      await ong.related('images').create({ url: imagePath });
    }

    await ong.save();
    return ong;
  }

  static async getOng(OngId: string) {
    const cacheKey = `ong:${OngId}`;
    const cachedOng = await CacheManager.get(cacheKey);

    if (cachedOng) {
      return cachedOng;
    }

    const ong = await Ong.query()
      .where('uuid', OngId)
      .preload('images', (query) => {
        query.whereNull('deleted_at').select('id', 'url');
      })
      .preload('animals')
      .firstOrFail();
    // await CacheManager.create(cacheKey, JSON.stringify(ong));

    return ong;
  }

  static async list(pagination: { page: number; limit: number }) {
    const ongs = await Ong.query()
      .whereNull('deleted_at')
      .preload('images', (query) => {
        query.whereNull('deleted_at').select('id', 'url');
      })
      .preload('animals', (query) => {
        query.whereNull('deleted_at').select('*');
      })
      .paginate(pagination.page, pagination.limit);

    return ongs;
  }

  static async edit(Ong: Ong, data: any) {
    const cacheKey = `user:${Ong.uuid}`;
    await CacheManager.delete(cacheKey);

    if (data.images) {
      const imagePath = await ImageUpload.upload(data.images, 'ongs');
      await Ong.load('images');

      if (Ong.images.length > 0) await ImageUpload.delete(Ong.images[0].url);

      await Ong.related('images').create({ url: imagePath });
    }

    const { images, ...ong } = data;
    Ong.merge(ong);

    await Ong.save();
    return Ong;
  }

  static async delete(OngId: string) {
    const ong = await Ong.findByOrFail('uuid', OngId);
    ong.deletedAt = DateTime.now();
    await ong.save();
    return ong;
  }
}
