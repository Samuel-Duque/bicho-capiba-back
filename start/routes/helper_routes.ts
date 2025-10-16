import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';

const HelpersController = () => import('#controllers/helpers_controller');

export default function helperRoutes() {
  router
    .group(() => {
      // Busca informações de CEP
      router.get('/cep/:cep', [HelpersController, 'getCep']);

      // Busca informações de CNPJ
      router.get('/cnpj/:cnpj', [HelpersController, 'getCnpj']);
    })
    .prefix('/helpers')
    .use(middleware.jwt()); // Aplica autenticação JWT em todas as rotas do grupo
}
