import type { HttpContext } from '@adonisjs/core/http'
import { responseWithPagination, responseWithSuccess } from '../helper/api_response.js';
import AnimalsService from '#services/animals_service';
import { RegisterAnimalValidator } from '#validators/register_animal';
import Ong from '#models/ong';
import AppError from '../helper/app_error.js';
import { UpdateAnimalValidator } from '#validators/update_animal';
import User from '#models/user';
import Animal from '#models/animal';

export default class AnimalsController {
  async index({ request, response, currentUser }: HttpContext) {
    try {
     
      const page = request.input('page', 1);
      const limit = request.input('limit', 10);
      const data = await AnimalsService.list({ page, limit }, currentUser);

    return responseWithPagination(response, data)
    } catch (error) {
      return response.status(400).json({ message: 'Error fetching animals', error: error.message })
    }
  }

  async store({ request, response, currentUser }: HttpContext) {
    try {
      const ong = currentUser! as Ong
      if (!ong) {
        throw AppError.E_UNAUTHORIZED('Ong not authenticated');
      }
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
  
  async update({ request, response, params }: HttpContext) {
    try {
      const { id } = params
      const data = await request.validateUsing(UpdateAnimalValidator)
      const animal = await AnimalsService.edit(id, data)

    return responseWithSuccess(response, animal)
    } catch (error) {
      return response.status(400).json({ message: 'Error updating animal', error: error.message })
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

  async addLike({ response, params, currentUser }: HttpContext) {
    try {
      const user = currentUser! as User
      const { animalId } = params

      const animal = await Animal.findByOrFail('uuid', animalId)
      await user.related('favoriteAnimals').attach([animal.id])

      return responseWithSuccess(response, { 
        message: 'Animal adicionado aos favoritos com sucesso'
      })
    } catch (error) {
      return response.status(400).json({ 
        message: 'Erro ao adicionar animal aos favoritos', 
        error: error
      })
    }
  }

  async removeLike({ response, params, currentUser }: HttpContext) {
    try {
      const user = currentUser! as User
      const { animalId } = params
      const animal = await Animal.findByOrFail('uuid', animalId)

      await user.related('favoriteAnimals').detach([animal.id])

      return responseWithSuccess(response, { 
        message: 'Animal removido dos favoritos com sucesso'
      })
    } catch (error) {
      return response.status(400).json({ 
        message: 'Erro ao remover animal dos favoritos', 
        error: error.message 
      })
    }
  }

  async getFavorites({ response, currentUser, request }: HttpContext) {
    try {
      const user = currentUser! as User
      const page = request.input('page', 1);
      const limit = request.input('limit', 10);

      const animals = await AnimalsService.fetchFavorites(user, { page, limit })
      return responseWithPagination(response, animals)
    } catch (error) {
      return response.status(400).json({ 
        message: 'Erro ao buscar animais favoritos', 
        error: error.message 
      })
    }
  }

  async checkLike({ response, params, currentUser }: HttpContext) {
    try {
      const user = currentUser! as User
      const { animalId } = params

      const animal = await AnimalsService.fetchLike(animalId, user.id) 
      
      return responseWithSuccess(response, animal)
    } catch (error) {
      return response.status(400).json({ 
        message: 'Erro ao verificar like', 
        error: error.message 
      })
    }
  }
}