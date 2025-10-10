import type { HttpContext } from '@adonisjs/core/http'
import { responseWithPagination, responseWithSuccess } from '../helper/api_response.js';
import AnimalsService from '#services/animals_service';
import { RegisterAnimalValidator } from '#validators/register_animal';
import Ong from '#models/ong';

export default class AnimalsController {
  async index({request, response}: HttpContext) {
    try {
      const page = request.input('page', 1);
      const limit = request.input('limit', 10);
      const data = await AnimalsService.list({ page, limit });

    return responseWithPagination(response, data)
    } catch (error) {
      return response.status(400).json({ message: 'Error fetching animals', error: error.message })
    }
  }

  async store({ request, response, currentUser }: HttpContext) {
    try {
      const ong = currentUser! as Ong
      console.log(ong)
      const data = await request.validateUsing(RegisterAnimalValidator)
      const animal = await AnimalsService.create(data, ong)

    return responseWithSuccess(response, animal)
    } catch (error) {
      return response.status(400).json({ message: 'Error creating animal', error: error })
    }
  }

  async show({ response, params }: HttpContext) {
    try {
      const { id } = params
      const data = await AnimalsService.getAnimal(id)

    return responseWithSuccess(response, data)
    } catch (error) {
      return response.status(400).json({ message: 'Error fetching animal', error: error.message })
    }
  }
  
  async update({ response, params, request }: HttpContext) {
    try {
      const data = 0;

    return responseWithSuccess(response, data)
    } catch (error) {
      
    }
  }

  async destroy({ response, params }: HttpContext) {
    try {
      const { id } = params
      const data = await AnimalsService.delete(id)

    return responseWithSuccess(response, data)
    } catch (error) {
      return response.status(400).json({ message: 'Error deleting animal', error: error.message })
    }
  }
}