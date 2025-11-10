import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'animal_vacina';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('animal_id');
      table.integer('vacina_id');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
