import Ong from '#models/ong';
import type { HttpContext } from '@adonisjs/core/http'
import { responseWithPagination } from '../helper/api_response.js';
import User from '#models/user';
import AdoptionsService from '#services/adoptions_service';

export default class AdoptionsController {
 
  async index({request, response, currentUser}: HttpContext) {
    const user = currentUser!
    const page = request.input('page', 1);
    const limit = request.input('limit', 10);

    console.log(user as User)
    if (user as Ong){
      const ong = user as Ong
      const adoptions = await AdoptionsService.listByOng(ong, { page, limit })
      
      return responseWithPagination(response, adoptions)
    }
    else {
      const adopter = user as User
      const adoptions = await AdoptionsService.listByUser(adopter, { page, limit })

      return responseWithPagination(response, adoptions)
    }
  }


  async store({ request }: HttpContext) {}


  async show({ params }: HttpContext) {}


  // async update({ params, request }: HttpContext) {}


  async destroy({ params }: HttpContext) {}
}