import Adoption from '#models/adoption';
import Animal from '#models/animal';
import Ong from '#models/ong';
import User from '#models/user';

type CreateAdoptionPayload = {
  animal_id: string;
};

type updateAdoption = {
  status: 'pendente' | 'aprovado' | 'rejeitado';
  motivo?: string;
};

export default class AdoptionsService {
  static async create(data: CreateAdoptionPayload, adopter: User) {
    const adoption = new Adoption();

    const animal = await Animal.query().where('uuid', data.animal_id).firstOrFail();
    await animal.load('ong');
    adoption.status = 'pendente';

    await adoption.related('animal').associate(animal);
    await adoption.related('ong').associate(animal.ong);
    await adoption.related('usuario').associate(adopter);

    await adoption.save();
    return adopter;
  }

  static async listByOng(ong: Ong, pagination: { page: number; limit: number }) {
    const adoptions = await Adoption.query()
      .where('id', ong.id)
      .preload('animal', (animalQuery) => {
        animalQuery.select(
          'id',
          'nome',
          'uuid',
          'raca_id',
          'especie_id',
          'cor_id',
          'ong_id',
          'data_nascimento',
          'sexo',
          'porte',
          'status_animal'
        );
        animalQuery.preload('fotos', (fotoQuery) => {
          fotoQuery.select('id', 'url');
        });
        animalQuery.preload('raca');
        animalQuery.preload('especie');
        animalQuery.preload('cor');
        animalQuery.preload('ong', (ongQuery) => {
          ongQuery.select('id', 'nome', 'email', 'telefone');
        });
      })
      .paginate(pagination.page, pagination.limit);

    return adoptions;
  }

  static async listByUser(user: User, pagination: { page: number; limit: number }) {
    const adoptions = await user
      .related('adoptions')
      .query()
      .paginate(pagination.page, pagination.limit);

    return adoptions;
  }

  static async edit(data: updateAdoption, adoptionId: string) {
    const adoption = await Adoption.findByOrFail('uuid', adoptionId);
    adoption.merge(data);
    await adoption.save();

    return adoption;
  }
}
