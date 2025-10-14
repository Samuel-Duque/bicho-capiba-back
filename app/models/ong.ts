import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import UUIDBaseModel from './uuid.js'
import Animal from './animal.js'
import File from './file.js'
import User from './user.js'
import Adoption from './adoption.js'

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
  declare bairro: string | null

  @column()
  declare rua : string | null

  @column()
  declare numero: string | null

  @column()
  declare cidade: string | null

  @column()
  declare estado: string | null

  @column()
  declare complemento: string | null

  @column()
  declare latitude: string | null
  
  @column()
  declare longitude: string | null

  @column()
  declare CEP: string | null

  @column()
  declare quantidadeAnimais: number | null
  
  @column()
  declare responsavelTecnico: string | null

  @column({ serializeAs: null })
  declare password: string
  
  @hasMany(() => File)
  declare fotos: HasMany<typeof File>

  @hasMany(() => Animal)
  declare animals: HasMany<typeof Animal>

  @hasMany(() => Adoption)
  declare adoptions: HasMany<typeof Adoption>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}