import { NextFn } from "@adonisjs/core/types/http"
import type { HttpContext } from '@adonisjs/core/http'
import JwtService from "#services/jwt_service"
import User from "#models/user"

export default class JwtAuthMiddleware {
    async handle(ctx: HttpContext, next: () => NextFn) {
        const token = JwtService.getTokenFromCookie(ctx)
        if (!token) {
            return ctx.response.status(401).json({ error: 'Unauthorized' })
        }

        const decoded = JwtService.verifyToken(token)
        if (!decoded) {
            JwtService.clearTokenCookie(ctx)
            return ctx.response.status(401).json({ error: 'Invalid Token' })
        }


        const user = await User.findBy('id', decoded.userId)

        if (!user) {
            JwtService.clearTokenCookie(ctx)
            return ctx.response.status(401).json({ error: 'User not found' })
        }

        ctx.currentUser = user
        return next()
    }   
}