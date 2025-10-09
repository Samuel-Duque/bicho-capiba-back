import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ongs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('uuid').notNullable().unique()
      table.string('nome').notNullable()
      table.string('cnpj').notNullable()
      table.string('email').notNullable()
      table.string('telefone').notNullable()
      table.string('descricao').nullable()
      table.string('endereco').nullable()
      table.string('CEP').nullable()
      table.integer('quantidade_animais').nullable()
      table.string('responsavel_tecnico').nullable()
      table.string('password').notNullable()
      table.string('imagem_perfil').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}