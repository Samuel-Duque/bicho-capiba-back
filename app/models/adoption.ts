import { DateTime } from 'luxon'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import UUIDBaseModel from './uuid.js'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Animal from './animal.js'
import Ong from './ong.js'

type AdoptionStatus = 'pendente' | 'aprovado' | 'rejeitado'

export default class Adoption extends UUIDBaseModel {
  
  @column()
  declare animalId: number
  @column()
  declare userId: number
  @column()
  declare ongId: number
  @column()
  declare status: AdoptionStatus
  @column()
  declare mensagem?: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => User)
  declare usuario: BelongsTo<typeof User>

  @belongsTo(() => Animal)
  declare animal: BelongsTo<typeof Animal>

  @belongsTo(() => Ong)
  declare ong: BelongsTo<typeof Ong>

}