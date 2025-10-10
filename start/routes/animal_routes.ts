import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

export default function animalsRoutes() {
    const AnimalsController = () => import('#controllers/animals_controller')

    router.group(() => {
        router.get('/', [AnimalsController, 'index'])
        router.post('/', [AnimalsController, 'store'])
        router.get('/:id', [AnimalsController, 'show'])
        router.put('/:id', [AnimalsController, 'update'])
        router.delete('/:id', [AnimalsController, 'destroy'])
    }).prefix('/animals').use(middleware.jwt())
}