import axios from 'axios';

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
      cnpj = cnpj.replace(/\D/g, '');

      const { data } = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
        timeout: 10000,
      });

      if (!data) {
        return false;
      }

      return true;
    } catch (error) {
      throw new Error('CNPJ not found');
    }
  }
}
