import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'racas';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('uuid');
      table.string('nome').notNullable();
      table.integer('especie_id').notNullable();
      table.timestamp('deleted_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
