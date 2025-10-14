import env from '#start/env';
import jwt from 'jsonwebtoken';
import { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';
import Ong from '#models/ong';

export default class JwtService {
  private static readonly JWT_SECRET = env.get('APP_KEY');
  private static readonly JWT_EXPIRES_IN = '30d';
  private static readonly COOKIE_NAME = 'auth_token';

  static generateToken(user: User | Ong): string {
    if (user as User) {
      return jwt.sign({ userId: user.uuid, email: user.email }, this.JWT_SECRET, {
        expiresIn: this.JWT_EXPIRES_IN,
      });
    }

    if (user as Ong) {
      return jwt.sign({ userId: user.uuid, email: user.email }, this.JWT_SECRET, {
        expiresIn: this.JWT_EXPIRES_IN,
      });
    }

    throw new Error('Invalid user type');
  }

  static verifyToken(token: string): { userId: string } | null {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as { userId: string };
      return decoded;
    } catch (error) {
      return null;
    }
  }

  static setAuthCoookie(ctx: HttpContext, token: string): void {
    ctx.response.cookie(this.COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  static getTokenFromCookie(ctx: HttpContext): string | null {
    return ctx.request.cookie(this.COOKIE_NAME) || null;
  }

  static clearTokenCookie(ctx: HttpContext): void {
    ctx.response.clearCookie(this.COOKIE_NAME);
  }
}
