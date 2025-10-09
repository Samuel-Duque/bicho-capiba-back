import axios from 'axios';

export default class brazilFinder {
    static async cepFinder(cep: string) {
    const { data } = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
    return data;
}

static async cnpjFinder(cnpj: string) {
    try {
        const { data } = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        return data;
    } catch (error) {
        throw new Error('CNPJ not found');
    }
}
}