import aws from 'aws-sdk'
import env from '#start/env'
import { DateTime } from 'luxon'
import { belongsTo, column, computed } from '@adonisjs/lucid/orm'
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

  @computed()
  public get full_url() {
    const s3 = new aws.S3({
      accessKeyId: env.get('S3_KEY'),
      secretAccessKey: env.get('S3_SECRET'),
      region: env.get('S3_REGION'),
    });

    const signedUrl = s3.getSignedUrl('getObject', {
      Bucket: env.get('S3_BUCKET'),
      Key: this.path,
      Expires: 86400,
    });

    const url = new URL(signedUrl);
    url.host = env.get('CLOUDFRONT_DOMAIN');

    return url.toString();
  }

  @computed()
  public get path() {
    return `uploads/${this.url}${this.extname}`;
  }
}