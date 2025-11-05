import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';

export default function ongsRoutes() {
  const OngController = () => import('#controllers/ongs_controller');

  router
    .group(() => {
      router.get('/', [OngController, 'index']);
      router.post('/', [OngController, 'store']).use(middleware.optionalAuth());
      router.put('/', [OngController, 'update']).use(middleware.jwt());
      router.get('/:id', [OngController, 'show']);
      router.delete('/:id', [OngController, 'delete']).use(middleware.jwt());
    })
    .prefix('/ongs');
}
