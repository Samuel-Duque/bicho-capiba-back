import { HttpContext } from '@adonisjs/core/http';
import brazilFinder from '../helpers/brazil_finder.js';
import { responseWithError, responseWithSuccess } from '../helpers/api_response.js';
import AppError from '../helpers/app_error.js';

export default class HelpersController {
  async getCep({ params, response }: HttpContext) {
    try {
      const { cep } = params;

      if (!cep || !/^\d{8}$/.test(cep)) {
        throw AppError.E_BAD_REQUEST('CEP inválido. Deve conter 8 dígitos numéricos.');
      }

      const data = await brazilFinder.cepFinder(cep);
      return responseWithSuccess(response, data);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw AppError.E_NOT_FOUND('Erro ao buscar CEP. Verifique se o CEP é válido.');
    }
  }

  async getCnpj({ params, response }: HttpContext) {
    try {
      const { cnpj } = params;

      const cnpjClean = cnpj.replace(/\D/g, '');

      if (!cnpjClean || cnpjClean.length !== 14) {
        throw AppError.E_BAD_REQUEST();
      }

      const data = await brazilFinder.cnpjFinder(cnpjClean);
      return responseWithSuccess(response, data);
    } catch (error: any) {
      return responseWithError(response, {
        status: error?.status || 404,
        message: 'Erro ao buscar CNPJ. Verifique se o CNPJ é válido.',
      });
    }
  }
}
