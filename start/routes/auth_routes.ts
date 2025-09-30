import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

export default function authRoutes() {
  const AuthController = () => import('#controllers/auth_controller')

  router.group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])


    router.group(() => {
        router.get('/me', [AuthController, 'me'])
        router.post('/logout', [AuthController, 'logout'])
    }).use(middleware.jwt())
  }).prefix('/auth')
}