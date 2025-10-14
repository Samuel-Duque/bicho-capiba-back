/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import authRoutes from './routes/auth_routes.js'
import ongsRoutes from './routes/ong_routes.js'
import animalsRoutes from './routes/animal_routes.js'
import likeRoutes from './routes/like_routes.js'
import adoptionRoutes from './routes/adoption_routes.js'

router.get('/', async () => {
  return {
    now: new Date().getTime(),
  }})


router.group(() => {
  authRoutes()
  ongsRoutes() // Add jwt auth after finishing development.
  animalsRoutes() // Add jwt auth after finishing development.
  adoptionRoutes()
  likeRoutes()
}).prefix('/api')
  

