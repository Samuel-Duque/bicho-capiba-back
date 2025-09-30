import { BaseModel, beforeSave, column } from "@adonisjs/lucid/orm"
import { randomUUID } from "crypto";

export default class UUIDBaseModel extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number;

  @column()
  declare uuid: string;

  @beforeSave()
  public static async generateUUID(model: any) {
    if (!model.uuid) {
      model.uuid = randomUUID();
    }
  }
}