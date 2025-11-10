import { belongsTo, column, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations';
import Especie from './especie.js';
import Animal from './animal.js';
import UUIDBaseModel from './uuid.js';

export default class Vacina extends UUIDBaseModel {
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

  @manyToMany(() => Animal)
  declare animais: ManyToMany<typeof Animal>;
}
