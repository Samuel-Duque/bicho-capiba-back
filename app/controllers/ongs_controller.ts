import OngsService from '#services/ongs_service';
import { registerOngValidator } from '#validators/register_ong';
import type { HttpContext } from '@adonisjs/core/http';
import {
  responseWithError,
  responseWithPagination,
  responseWithSuccess,
} from '../helpers/api_response.js';
import { updateOngValidator } from '#validators/update_ong';
import Ong from '#models/ong';
import AppError from '../helpers/app_error.js';
// AppError not used here

export default class OngsController {
  async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1);
      const limit = request.input('limit', 10);
      const ongs = await OngsService.list({ page, limit });

      return responseWithPagination(response, ongs);
    } catch (error) {
      return response.status(error.status).json(error.message);
    }
  }
  async show({ response, params }: HttpContext) {
    try {
      const { id } = params;
      const ong = await OngsService.getOng(id);

      return responseWithSuccess(response, ong);
    } catch (error) {
      return response.status(error.status).json(error.message);
    }
  }
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(registerOngValidator);
      const ong = await OngsService.create(data);

      return responseWithSuccess(response, ong);
    } catch (error) {
      return responseWithError(response, error);
    }
  }
  async update({ response, request, currentUser }: HttpContext) {
    try {
      const user = currentUser as Ong;
      if (user instanceof Ong === false) {
        throw AppError.E_UNAUTHORIZED('Ong not authenticated');
      }
      const data = await request.validateUsing(updateOngValidator);
      const ong = await OngsService.edit(user, data);

      return responseWithSuccess(response, ong);
    } catch (error) {
      return responseWithError(response, error);
    }
  }
  async delete({ response, params }: HttpContext) {
    try {
      const { id } = params;
      const ong = await OngsService.delete(id);

      return responseWithSuccess(response, ong);
    } catch (error) {
      return response.status(error.status).json(error.message);
    }
  }

  async listOngAnimals({ response, currentUser }: HttpContext) {
    try {
      const ong = currentUser as Ong;
      if (ong instanceof Ong === false) {
        throw AppError.E_UNAUTHORIZED('Ong not authenticated');
      }

      const animals = await OngsService.listAnimalsByOng(ong);

      return responseWithSuccess(response, animals);
    } catch (error) {
      return responseWithError(response, error);
    }
  }
}
