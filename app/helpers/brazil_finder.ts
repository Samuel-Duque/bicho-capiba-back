import axios from 'axios';
import AppError from './app_error.js';

export default class brazilFinder {
  static async cepFinder(cep: string) {
    //add timout of 10 seconds
    const { data } = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`, {
      timeout: 10000,
    });

    return {
      street: data.street,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      cep: data.cep,
    };
  }

  static async cnpjFinder(cnpj: string) {
    try {
      console.log('CNPJ:', cnpj);
      const { data } = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
        timeout: 10000,
      });

      if (!data) {
        return false;
      }

      return true;
    } catch (error) {
      throw AppError.E_UNPROCESSABLE_ENTITY('Invalid CNPJ');
    }
  }
}
