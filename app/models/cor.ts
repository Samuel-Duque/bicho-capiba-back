import { column } from '@adonisjs/lucid/orm';
import UUIDBaseModel from './uuid.js';

export default class Cor extends UUIDBaseModel {
  public static table = 'cores';

  @column({ isPrimary: true, serializeAs: null })
  declare id: number;

  @column()
  declare nome: string;

  @column()
  declare hexadecimal: string;
}
