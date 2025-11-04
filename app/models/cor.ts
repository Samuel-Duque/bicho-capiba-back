import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cor extends BaseModel {
  public static table = 'cores';

  @column({ isPrimary: true, serializeAs: null })
  declare id: number;

  @column()
  declare nome: string;

  @column()
  declare hexadecimal: string;
}
