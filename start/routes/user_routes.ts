import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';

export default function UserRoutes() {
  const UserController = () => import('#controllers/users_controller');

  router
    .group(() => {
      router.get('/', [UserController, 'index']);
      // router.post('/', [UserController, 'store']);
      router.put('/', [UserController, 'update']).use(middleware.jwt());
      router.get('/:id', [UserController, 'show']).use(middleware.jwt());
      router.delete('/:id', [UserController, 'destroy']).use(middleware.jwt());
    })
    .prefix('/users');
}
