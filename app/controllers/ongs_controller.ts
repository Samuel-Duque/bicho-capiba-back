import OngsService from '#services/ongs_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class OngsController {
    async store({ request, response }: HttpContext) {
        try {
            const data = request.body()
            const ong = await OngsService.create(data)
            return response.status(201).json(ong)
        } catch (error) {
            return response.status(error.status).json(error.message)
        }
    }

    async index({ response }: HttpContext) {
        try {
            
        } catch (error) {
            return response.status(error.status).json(error.message)
        }
    }
    async show({ params, response }: HttpContext) {
        try {
            
        } catch (error) {
            return response.status(error.status).json(error.message)
        }
    }
    async update({ params, request, response }: HttpContext) {
        try {
            
        } catch (error) {
            return response.status(error.status).json(error.message)
        }
    }
    async delete({ params, response }: HttpContext) {
        try {
            
        } catch (error) {
            return response.status(error.status).json(error.message)
        }
    }
}