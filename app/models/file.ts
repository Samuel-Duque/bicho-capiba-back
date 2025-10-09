import { DateTime } from 'luxon'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Animal from '#models/animal'
import Ong from '#models/ong'
import UUIDBaseModel from './uuid.js'

type FileType = 'MEDIA' | 'VIDEO'

export default class File extends UUIDBaseModel {
  @column()
  declare url: string

  @column()
  declare type: FileType

  @column({ serializeAs: null })
  declare animalId: number

  @column({ serializeAs: null })
  declare ongId: number
  
  @column()
  declare extname: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => Animal)
  declare animal: BelongsTo<typeof Animal>

  @belongsTo(() => Ong)
  declare ong: BelongsTo<typeof Ong>
}