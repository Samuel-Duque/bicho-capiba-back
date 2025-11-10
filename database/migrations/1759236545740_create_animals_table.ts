import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'animals';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable();
      table.string('uuid').notNullable().unique();
      table.string('nome').notNullable();
      table.enum('sexo', ['M', 'F']).notNullable();
      table.enum('porte', ['Pequeno', 'Medio', 'Grande']).notNullable();
      table.integer('cor_id').notNullable().defaultTo(1);
      table.integer('especie_id').notNullable().defaultTo(1);
      table.integer('raca_id').notNullable().defaultTo(1);
      table.string('data_nascimento').nullable().defaultTo(1);
      table.boolean('castrado').nullable();
      table.string('necessidades_especiais').nullable();
      table.text('historia').nullable();
      table
        .enum('status_animal', ['Disponivel', 'Adotado', 'Pendente'])
        .notNullable()
        .defaultTo('Disponivel');
      table.boolean('sociavel_animal').nullable();
      table.boolean('sociavel_pessoa').nullable();
      table.integer('ong_id');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
      table.timestamp('deleted_at').nullable();

      table.index(['nome']);
      table.index(['especie_id']);
      table.index(['raca_id']);
      table.index(['status_animal']);
      table.index(['ong_id']);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
