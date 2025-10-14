import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'


export default function animalsRoutes(){    
const AnimalsController = () => import('#controllers/animals_controller')

router
  .group(() => {
    router.post('/animals/:animalId/like', [AnimalsController, 'addLike'])
    router.delete('/animals/:animalId/like', [AnimalsController, 'removeLike'])
    router.get('/me/favorites', [AnimalsController, 'getFavorites'])
    router.get('/animals/:animalId/liked', [AnimalsController, 'checkLike'])
  })
  .use(middleware.jwt())
}
