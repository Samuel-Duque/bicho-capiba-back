import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'cores';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('nome').notNullable().unique();
      table.string('hexadecimal').notNullable().unique();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
