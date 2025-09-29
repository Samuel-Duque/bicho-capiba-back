import User from '#models/user'
import JwtService from '#services/jwt_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {


   async register ({ request, response, auth }: HttpContext){
    try {

      const data = request.only(['fullName', 'email', 'password'])
      const user = await User.create(data)

      return User.accessTokens.create(user)

    } catch (error) {
      return response.status(404).json('Ok')
    }
  }

  async login({ request, response }: HttpContext) {

    const {email, password} = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = JwtService.generateToken(user)

    JwtService.setAuthCoookie({response} as HttpContext, token)

    return response.status(200).json({ user, token })
  }

  async logout({ response }: HttpContext) {
    JwtService.clearTokenCookie({response} as HttpContext)
  
    return response.status(200).json({ message: 'Logged out successfully' })
  }

  async me({ request, response, currentUser }: HttpContext) {

    const user = currentUser


    return response.status(200).json({user})
  }
}