import User from '#models/user'
import JwtService from '#services/jwt_service'
import type { HttpContext } from '@adonisjs/core/http'
import { registerUserValidator } from '#validators/register_user'
import brazilFinder from '../helper/brazil_finder.js'
import CacheManager from '../helper/cache_manager.js'
export default class AuthController {
   async register ({ request, response }: HttpContext){
    try {
      const { fullName, email, password, cep } = await request.validateUsing(registerUserValidator)
      const user = new User()
      user.fullName = fullName
      user.email = email
      user.password = password

      const {street, cep: CEP} = await brazilFinder.cepFinder(cep)
      user.endereco = street
      user.CEP = CEP

      await user.save()

      const token = JwtService.generateToken(user)
      JwtService.setAuthCoookie({ response } as HttpContext, token)

      return response.status(201).json({ user, token })

    } catch (error) {
      return response.status(404).json({ message: 'Error creating user', error: error.message })
    }
  }

  async login({ request, response }: HttpContext) {

    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = JwtService.generateToken(user)

    JwtService.setAuthCoookie({ response } as HttpContext, token)

    return response.status(200).json({ user, token })
  }

  async logout({ response }: HttpContext) {
    JwtService.clearTokenCookie({ response } as HttpContext)

    return response.status(200).json({ message: 'Logged out successfully' })
  }

  async me({ response, currentUser }: HttpContext) {
    const cacheKey = `user:${currentUser?.id}`
    const cachedUser = await CacheManager.get(cacheKey)

    if (cachedUser) {
      return response.status(200).json(cachedUser)
    }

    const user = JSON.stringify(currentUser)
    await CacheManager.create(cacheKey, user, 3600) 
    return response.status(200).json(user)
  }
}