import router from '@adonisjs/core/services/router'

export default function UserRoutes(){
  const UserController = () => import('#controllers/users_controller')


  router.group(() => {
    router.get('/', [UserController, 'index'])
    // router.post('/', [UserController, 'store'])
    router.get('/:id', [UserController, 'show'])
    router.put('/:id', [UserController, 'update'])
    router.delete('/:id', [UserController, 'destroy'])
  })

}