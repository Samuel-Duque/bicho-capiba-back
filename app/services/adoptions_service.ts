import Adoption from '#models/adoption';
import Ong from '#models/ong';
import User from '#models/user';

type updateAdoption = {
  status: 'pendente' | 'aprovado' | 'rejeitado';
  messagem?: string;
};

export default class AdoptionsService {
  static async create(data: any, adopter: User) {}

  static async listByOng(ong: Ong, pagination: { page: number; limit: number }) {
    const adoptions = await ong
      .related('adoptions')
      .query()
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
