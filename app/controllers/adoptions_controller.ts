import Ong from '#models/ong';
import type { HttpContext } from '@adonisjs/core/http';
import { responseWithPagination, responseWithSuccess } from '../helpers/api_response.js';
import User from '#models/user';
import AdoptionsService from '#services/adoptions_service';
import { updateAdoptionValidator } from '#validators/update_adoption';
import { CreateAdoptionValidator } from '#validators/create_adoption';

export default class AdoptionsController {
  async index({ request, response, currentUser }: HttpContext) {
    const user = currentUser!;
    const page = request.input('page', 1);
    const limit = request.input('limit', 10);

    if (user instanceof Ong) {
      const ong = user as Ong;
      const adoptions = await AdoptionsService.listByOng(ong, { page, limit });

      return responseWithPagination(response, adoptions);
    } else {
      const adopter = user as User;
      const adoptions = await AdoptionsService.listByUser(adopter, { page, limit });

      return responseWithPagination(response, adoptions);
    }
  }

  async store({ request, response, currentUser }: HttpContext) {
    try {
      const user = currentUser!;
      const adopter = user as User;
      const data = await request.validateUsing(CreateAdoptionValidator);
      const adoption = await AdoptionsService.create(data, adopter);

      return responseWithSuccess(response, adoption);
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: 'Error creating adoption', error: error.message });
    }
  }

  // async show({ params }: HttpContext) {}

  async update({ params, request, response }: HttpContext) {
    try {
      const { id } = params;
      const data = await request.validateUsing(updateAdoptionValidator);
      const adoption = await AdoptionsService.edit(data, id);

      return responseWithSuccess(response, adoption);
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'Error updating adoption', error: error.message });
    }
  }

  // async destroy({ params }: HttpContext) {}
}
