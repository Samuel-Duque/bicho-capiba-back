import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'files'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('url')
      table.enum('type', ['MEDIA', 'VIDEO']).notNullable()
      table.integer('animal_id').unsigned().references('id').inTable('animals').onDelete('CASCADE')
      table.integer('ong_id').unsigned().references('id').inTable('ongs').onDelete('CASCADE')
      table.string('extname')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}