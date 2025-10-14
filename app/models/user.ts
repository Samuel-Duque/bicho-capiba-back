import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import UUIDBaseModel from './uuid.js'
import Animal from './animal.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Adoption from './adoption.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(UUIDBaseModel, AuthFinder) {
  @column()
  declare fullName: string 

  @column()
  declare email: string

  @column()
  declare telefone: string | null

  @column()
  declare dataNascimento: Date | null

  @column()
  declare CEP: string | null

  @column()
  declare endereco: string | null

  @column({serializeAs: null})
  declare numeroResidencia: string | null

  @column({serializeAs: null})
  declare complementoResidencia: string | null

  @column()
  declare RG: string | null

  @column()
  declare tipoResidencia: string | null

  @column()
  declare areaExterna: boolean | null

  @column()
  declare possuiAnimais: boolean | null

  @column()
  declare quantidadeAnimais: number | null

  @column()
  declare telaProtetora: boolean | null

  @column()
  declare quantidadeMoradores: number | null

  @column()
  declare idadeAnimais: string | null

  @column()
  declare sexoAnimais: string | null

  @column()
  declare comportamentoAnimais: string | null

  @column()
  declare possuiCriancas: boolean | null

  @column()
  declare quantidadeCriancas: number | null

  @column()
  declare criancaNecessidadeEspecial: boolean | null

  @column()
  declare faixaEtariaCriancas: string | null

  @column()
  declare tipoNecessidadeCriancas: string | null

  @column()
  declare composicaoFamiliar: string | null
  
  @column()
  declare familiarNecessidadeEspecial: boolean | null
  
  @column()
  declare tipoNecessidadeEspecialFamiliar: string | null
  
  @column()
  declare experienciaComAnimais: boolean | null
  
  @column()
  declare conhecimentoDespesasAnimais: boolean | null

  @column()
  declare tempoDisponivel: string | null

  @column({ serializeAs: null })
  declare password: string

  @hasMany(() => Adoption)
  declare adoptions: HasMany<typeof Adoption>

  @manyToMany(() => Animal, {
    pivotTable: 'likes',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'animal_id',
    pivotColumns: ['created_at'],
  })
  declare favoriteAnimals: ManyToMany<typeof Animal>
  
  @column({ serialize: (superUser) => superUser === 1 })
  declare superUser: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare deletedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}