import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'users';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable();
      table.string('uuid').notNullable().unique();
      table.string('full_name').notNullable();
      table.string('email', 254).notNullable().unique();
      table.string('telefone').nullable();
      table.date('data_nascimento').nullable();
      table.string('CEP').nullable();
      table.string('bairro').nullable();
      table.string('rua').nullable();
      table.string('numero').nullable();
      table.string('cidade').nullable();
      table.string('estado').nullable();
      table.string('complemento').nullable();
      table.string('numero_residencia').nullable();
      table.string('complemento_residencia').nullable();
      table.string('cpf').nullable();
      table.string('tipo_residencia').nullable();
      table.boolean('area_externa').nullable();
      table.boolean('possui_animais').nullable();
      table.integer('quantidade_animais').nullable();
      table.boolean('tela_protetora').nullable();
      table.integer('quantidade_moradores').nullable();
      table.string('idade_animais').nullable();
      table.string('sexo_animais').nullable();
      table.string('comportamento_animais').nullable();
      table.boolean('possui_criancas').nullable();
      table.integer('quantidade_criancas').nullable();
      table.boolean('crianca_necessidade_especial').nullable();
      table.string('faixa_etaria_criancas').nullable();
      table.string('tipo_necessidade_criancas').nullable();
      table.string('composicao_familiar').nullable();
      table.boolean('familiar_necessidade_especial').nullable();
      table.string('tipo_necessidade_especial_familiar').nullable();
      table.boolean('experiencia_com_animais').nullable();
      table.boolean('conhecimento_despesas_animais').nullable();
      table.string('tempo_disponivel').nullable();
      table.string('password').notNullable();
      table.integer('super_user').notNullable().defaultTo(0);

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
      table.timestamp('deleted_at').nullable();

      table.index(['full_name']);
      table.index(['email']);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
