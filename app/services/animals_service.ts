import Animal from '#models/animal';
import Ong from '#models/ong';
import { DateTime } from 'luxon';
import ImageUpload from '../helpers/image_upload.js';
import User from '#models/user';
import CacheManager from '../helpers/cache_manager.js';
import Especie from '#models/especie';
import Cor from '#models/cor';
import Vacina from '#models/vacina';
export default class AnimalsService {
  static async create(data: any, ong: Ong) {
    const ongId = ong.id;
    const animal = new Animal();
    animal.nome = data.nome;
    animal.idade = data.idade;
    animal.sexo = data.sexo;
    animal.porte = data.porte;
    animal.cor = data.cor;
    animal.especie = data.especie;
    animal.raca = data.raca;
    animal.dataNascimento = data.data_nascimento || null;
    animal.vacinas = data.vacinas || null;
    animal.castrado = data.castrado || null;
    animal.necessidadesEspeciais = data.necessidades_especiais || null;
    animal.historia = data.historia || null;
    animal.statusAnimal = 'Disponivel';
    animal.sociavelAnimal = data.sociavel_animal || null;
    animal.sociavelPessoa = data.sociavel_pessoa || null;
    animal.ongId = ongId;
    console.log(data);

    if (data.images) {
      console.log('has images');

      console.log(data.images);

      const imagePath = await ImageUpload.upload(data.images, 'animals');
      await animal.related('fotos').create({ url: imagePath, extname: '' });

      // Se quiser suportar múltiplas imagens no futuro

      // for (const image of data.images) {
      //     const imageName = await ImageUpload.upload(image, 'animals')
      //     console.log(imageName)
      //     await animal.related('fotos').create({ url: imageName })
      // }
    }

    await animal.save();

    return animal;
  }

  static async getAnimal(animalId: string) {
    const animal = await Animal.query()
      .where('uuid', animalId)
      .preload('cor')
      .preload('raca')
      .preload('especie')
      .preload('fotos', (query) => {
        query.whereNull('deleted_at').select('id', 'url');
      })
      .preload('ong', (query) => {
        query.select('id', 'nome', 'email', 'telefone');
      })
      .firstOrFail();

    return animal;
  }

  static async list(pagination: { page: number; limit: number }, currentUser?: any) {
    console.time('fetchAnimals');
    const query = Animal.query()
      .select([
        'id',
        'uuid',
        'nome',
        'idade',
        'sexo',
        'ong_id',
        'raca_id',
        'especie_id',
        'cor_id',
        'porte',
        'status_animal',
      ])
      .whereNull('deleted_at')
      .preload('fotos', (query) => {
        query.whereNull('deleted_at').select('id', 'url');
      })
      .preload('raca', (query) => {
        query.select('nome');
      })
      .preload('ong', (query) => {
        query.select('id', 'nome', 'email', 'telefone', 'bairro', 'cidade', 'estado');
      });
    if (currentUser) {
      query.preload('favoriteAnimals', (q) => {
        q.where('user_id', currentUser.id);
      });
    }

    console.log(query.toQuery());

    const result = await query.paginate(pagination.page, pagination.limit);
    console.timeEnd('fetchAnimals');
    return result;
  }

  static async edit(animalId: string, data: any) {
    const animal = await Animal.findByOrFail('uuid', animalId);

    if (data.images) {
      const imagePath = await ImageUpload.upload(data.images, 'animals');
      await animal.related('fotos').create({ url: imagePath, extname: '' });
    }

    animal.merge(data);
    await animal.save();

    return animal;
  }

  static async delete(animalId: string) {
    const animal = await Animal.findByOrFail('uuid', animalId);
    animal.deletedAt = DateTime.now();

    await animal.save();

    return animal;
  }

  static async fetchFavorites(user: User, pagination: { page: number; limit: number }) {
    const cacheKey = `user:${user.id}:likedAnimals`;
    const cache = await CacheManager.get(cacheKey);

    if (cache) {
      return cache;
    }

    const likedAnimals = await user
      .related('favoriteAnimals')
      .query()
      .preload('fotos', (q) => {
        q.whereNull('deleted_at').select('url');
      })
      .preload('ong', (q) => {
        q.select('id', 'nome', 'email', 'telefone', 'bairro');
      })
      .paginate(pagination.page, pagination.limit);

    await CacheManager.create(cacheKey, JSON.stringify(likedAnimals));
    return likedAnimals;
  }

  static async fetchLike(animalId: string, userId: number) {
    const user = await User.findOrFail(userId);
    const animal = await Animal.findByOrFail('uuid', animalId);

    const pivotRow = await user
      .related('favoriteAnimals')
      .pivotQuery()
      .where('animal_id', animal.id)
      .first();

    if (!pivotRow) {
      throw new Error('Like not found');
    }

    return pivotRow;
  }

  static async getFiltersData() {
    const especies = await Especie.query().preload('racas');
    console.log(especies);
    const cores = await Cor.query().select('nome', 'hexadecimal');
    const vacinas = await Vacina.query().select('nome');

    return {
      especies,
      cores,
      vacinas,
    };
  }
}
