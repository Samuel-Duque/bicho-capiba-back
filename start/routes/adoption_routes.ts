import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

export default function adoptionRoutes() {
    const AdoptionsController = () => import('#controllers/adoptions_controller')

    router.group(() => {
        router.get('/', [AdoptionsController, 'index']).use(middleware.jwt())
        router.post('/', [AdoptionsController, 'store']).use(middleware.jwt())
        router.get('/:id', [AdoptionsController, 'show']).use(middleware.jwt())
        router.delete('/:id', [AdoptionsController, 'destroy']).use(middleware.jwt())
        // router.put('/:id', [AdoptionsController, 'update']).use(middleware.jwt())
    }).prefix('/adoptions')
}