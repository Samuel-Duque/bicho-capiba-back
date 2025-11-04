import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import Raca from './raca.js';
import type { HasMany } from '@adonisjs/lucid/types/relations';

export default class Especie extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number;

  @column()
  declare nome: string;

  @hasMany(() => Raca)
  declare racas: HasMany<typeof Raca>;
}
