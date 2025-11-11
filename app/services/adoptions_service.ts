import Adoption from '#models/adoption';
import Animal from '#models/animal';
import Ong from '#models/ong';
import User from '#models/user';
import AppError from '../helpers/app_error.js';

type updateAdoption = {
  status: 'pendente' | 'aprovado' | 'rejeitado';
  motivo?: string;
};

export default class AdoptionsService {
  static async create(data: any, adopter: User) {
    const existingAdoption = await Adoption.query()
      .where('user_id', adopter.id)
      .andWhereHas('animal', (animalQuery) => {
        animalQuery.where('uuid', data.animal_id);
      })
      .first();

    if (existingAdoption) {
      throw AppError.E_CONFLICT(
        'Adoption request already exists for this animal and user.'
      );
    }

    adopter.tipoResidencia = data.tipo_residencia;
    adopter.areaExterna = data.area_externa;
    adopter.telaProtetora = data.tela_protetora;
    adopter.composicaoFamiliar = data.composicao_familiar;
    adopter.quantidadeMoradores = parseInt(data.quantidade_moradores);
    adopter.possuiCriancas = data.possui_criancas;
    adopter.quantidadeCriancas = data.quantidade_criancas
      ? parseInt(data.quantidade_criancas)
      : null;
    adopter.faixaEtariaCriancas = data.faixa_etaria_criancas || null;
    adopter.criancaNecessidadeEspecial = data.crianca_necessidade_especial;
    adopter.tipoNecessidadeCriancas = data.tipo_necessidade_criancas || null;
    adopter.familiarNecessidadeEspecial = data.familiar_necessidade_especial;
    adopter.tipoNecessidadeEspecialFamiliar =
      data.tipo_necessidade_especial_familiar || null;
    adopter.possuiAnimais = data.possui_animais;
    adopter.quantidadeAnimais = data.quantidade_animais
      ? parseInt(data.quantidade_animais)
      : null;
    adopter.idadeAnimais = data.idade_animais || null;
    adopter.sexoAnimais = data.sexo_animais || null;
    adopter.experienciaComAnimais = data.experiencia_com_animais;
    adopter.comportamentoAnimais = data.comportamento_animais;
    adopter.conhecimentoDespesasAnimais = data.conhecimento_despesas_animais;
    adopter.tempoDisponivel = data.tempo_disponivel;

    await adopter.save();

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
      .where('ong_id', ong.id)
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
    const adoptions = await Adoption.query()
      .where('user_id', user.id)
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

  static async edit(data: updateAdoption, adoptionId: string) {
    const adoption = await Adoption.findByOrFail('uuid', adoptionId);
    adoption.merge(data);
    await adoption.save();

    return adoption;
  }
}
