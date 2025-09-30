import router from '@adonisjs/core/services/router'

export default function ongsRoutes() {
  const OngController = () => import('#controllers/ongs_controller')


  router.group(() => {
    router.get('/', [OngController, 'index'])
    router.post('/', [OngController, 'store'])
    router.get('/:id', [OngController, 'show'])
    router.put('/:id', [OngController, 'update'])
    router.delete('/:id', [OngController, 'delete'])
  }).prefix('/ongs')
}