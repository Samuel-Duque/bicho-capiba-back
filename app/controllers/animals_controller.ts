import type { HttpContext } from '@adonisjs/core/http'
import { responseWithPagination, responseWithSuccess } from '../helper/api_response.js';
import AnimalsService from '#services/animals_service';
import { RegisterAnimalValidator } from '#validators/register_animal';

export default class AnimalsController {
  async index({request, response}: HttpContext) {
    try {
      const page = request.input('page', 1);
      const limit = request.input('limit', 10);
      const data = await AnimalsService.list({ page, limit });

    return responseWithPagination(response, data)
    } catch (error) {
      
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.validateUsing(RegisterAnimalValidator)

    return responseWithSuccess(response, data)
    } catch (error) {
      
    }
  }

  async show({ response, params }: HttpContext) {
    try {
      const data = 0;

    return responseWithSuccess(response, data)
    } catch (error) {
      
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
      const data = 0;

    return responseWithSuccess(response, data)
    } catch (error) {
      
    }
  }
}