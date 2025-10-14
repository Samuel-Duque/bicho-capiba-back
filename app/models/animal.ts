import { DateTime } from 'luxon'
import { belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import File from '#models/file'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import UUIDBaseModel from './uuid.js'
import Ong from './ong.js'
import User from './user.js'
import Adoption from './adoption.js'

type AnimalSexo = 'M' | 'F'
type AnimalPorte = 'Pequeno' | 'Medio' | 'Grande'
type AnimalStatus = 'Disponivel' | 'Adotado' | 'Pendente'

export default class Animal extends UUIDBaseModel {
  @column()
  declare nome: string
  
  @column()
  declare idade: string
  
  @column()
  declare sexo: AnimalSexo
  
  @column()
  declare porte: AnimalPorte
  
  @column()
  declare cor: string
  
  @column()
  declare especie: string
  
  @column()
  declare raca: string
  
  @column()
  declare dataNascimento: string | null
  
  @column()
  declare vacinas: string | null
  
  @column()
  declare castrado: boolean | null
  
  @column()
  declare necessidadesEspeciais: string | null
  
  @column()
  declare historia: string | null
  
  @column()
  declare statusAnimal: AnimalStatus
  
  @column()
  declare sociavelAnimal: boolean | null
  
  @column()
  declare sociavelPessoa: boolean | null

  @column({ serializeAs: null })
  declare ongId: number

  @belongsTo(() => Ong)
  declare ong: BelongsTo<typeof Ong>

  @hasMany(() => File)
  declare fotos: HasMany<typeof File>

  @hasMany(() => Adoption)
  declare adoptions: HasMany<typeof Adoption>

  @manyToMany(() => User, {
    pivotTable: 'likes',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'animal_id',
    pivotRelatedForeignKey: 'user_id',
    pivotColumns: ['created_at'],
  })
  declare favoriteAnimals: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
  
}