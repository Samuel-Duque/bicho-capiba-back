import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'adoptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid').notNullable().unique()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('animal_id').unsigned().notNullable().references('id').inTable('animals').onDelete('CASCADE')
      table.enum('status', ['pendente', 'aprovado', 'rejeitado']).defaultTo('pendente').notNullable()
      table.text('motivo').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at').nullable()

      table.unique(['user_id', 'animal_id'])

      table.index(['user_id'])
      table.index(['animal_id'])
      table.index(['user_id', 'animal_id', 'status'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}