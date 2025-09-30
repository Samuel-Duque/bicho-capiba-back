import User from '#models/user'
import UsersService from '#services/users_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {

  async index({ response, currentUser }: HttpContext) {
    try {
      const user = currentUser as User

      if (!user.superUser) {
        return response.status(403).json({ message: 'Forbidden' })
      }

      const users = await UsersService.list()
      
      return response.status(200).json(users)
    } catch (error) {
      return response.status(error.status).json(error.message)
    }
  }

  // async store({ response, request, currentUser }: HttpContext) {
  //   try {
  //     const user = currentUser!
  //     const data = request.body

  //     const newUser = await UsersService.create(data)
  //     return response.status(201).json(newUser)
  //   } catch (error) {
  //     return response.status(error.status).json(error.message)
  //   }
  // }

  async show({ response, params }: HttpContext) {
    try {
      const user = await UsersService.findUser(params.id)
      return response.status(200).json(user)
    } catch (error) {
      return response.status(error.status).json(error.message)
    }
  }

  async update({ response, params, request }: HttpContext) {
    try {
      
    } catch (error) {
      return response.status(error.status).json(error.message)
    }
  }

  async destroy({ response, params }: HttpContext) {
    try {
      
    } catch (error) {
      return response.status(error.status).json(error.message)
    }
  }
}