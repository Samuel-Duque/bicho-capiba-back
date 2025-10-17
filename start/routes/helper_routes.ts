import router from '@adonisjs/core/services/router';

const HelpersController = () => import('#controllers/helpers_controller');

export default function helperRoutes() {
  router
    .group(() => {
      router.get('/cep/:cep', [HelpersController, 'getCep']);

      router.get('/cnpj/:cnpj', [HelpersController, 'getCnpj']);
    })
    .prefix('/helpers');
}
