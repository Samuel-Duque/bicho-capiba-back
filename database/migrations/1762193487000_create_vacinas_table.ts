import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'vacinas';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('nome').notNullable();
      table.integer('especie_id').notNullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
