import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Especie from './especie.js';

export default class Vacina extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number;

  @column()
  declare nome: string;

  @column()
  declare descricao: string | null;

  @column({ serializeAs: null })
  declare especieId: number;

  @belongsTo(() => Especie)
  declare especie: BelongsTo<typeof Especie>;
}
