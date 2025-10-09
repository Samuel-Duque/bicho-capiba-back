import env from '#start/env'
import { cuid } from '@adonisjs/core/helpers'
import { MultipartFile } from '@adonisjs/core/types/bodyparser'
import drive from '@adonisjs/drive/services/main'
import { createReadStream } from 'node:fs'

export default class ImageUpload {
  
  static async upload(image: MultipartFile, path = 'images') {
    if (!image || !image.isValid) {
      throw new Error('Invalid image file')
    }

    const stream = createReadStream(image.tmpPath!)
    
    const fileName = `${cuid()}.${image.extname}`
    const filePath = `/${path}/${fileName}`

    try {
      await drive.use('s3').putStream(filePath, stream, {
        visibility: 'public',
        contentType: image.type + '/' + image.subtype,
      })
      
      const cdn = env.get('CLOUDFRONT_DOMAIN')
      const fullUrl = `${cdn}${filePath}`

      return fullUrl
    } catch (error) {
      throw new Error('Failed to upload image', { cause: error })
    }
  }

  static async show(filePath: string) {
    try {
      const url = await drive.use('s3').getUrl(filePath)
      return url
    } catch (error) {
      throw new Error('Failed to get image URL', { cause: error })
    }
  }

  static async delete(filePath: string){
    try {
      await drive.use('s3').delete(filePath)
    } catch (error) {
      throw new Error('Failed to delete image', { cause: error })
    }
  }
}