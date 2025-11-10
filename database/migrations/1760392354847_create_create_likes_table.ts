import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'likes';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('user_id').notNullable();
      table.integer('animal_id').notNullable();

      table.unique(['user_id', 'animal_id']);

      table.timestamp('created_at').defaultTo(this.now()).notNullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
