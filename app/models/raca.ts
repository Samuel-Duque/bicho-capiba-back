import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Especie from './especie.js';
import Animal from './animal.js';
import UUIDBaseModel from './uuid.js';

export default class Raca extends UUIDBaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number;

  @column()
  declare nome: string;

  @column({ serializeAs: null })
  declare especieId: number;

  @belongsTo(() => Especie)
  declare especie: BelongsTo<typeof Especie>;

  @hasMany(() => Animal)
  declare animais: HasMany<typeof Animal>;
}
