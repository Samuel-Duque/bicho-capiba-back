import axios from 'axios';

export default async function cepFinder(cep: string) {
    const { data } = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
    return data;
}