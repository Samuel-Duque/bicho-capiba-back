import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import UUIDBaseModel from './uuid.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class Ong extends compose(UUIDBaseModel, AuthFinder) {
  @column()
  declare nome: string

  @column()
  declare cnpj: string

  @column()
  declare email: string

  @column()
  declare telefone: string

  @column()
  declare descricao: string | null

  @column()
  declare endereco: string | null

  @column()
  declare CEP: string | null

  @column()
  declare quantidadeAnimais: number | null
  
  @column()
  declare responsavelTecnico: string | null
  
  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}