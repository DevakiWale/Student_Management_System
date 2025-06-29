import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.token, // 🍪 from cookies
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'DevakiSuperSecret123',
    });
  }

  async validate(payload: any) {
    return { id: payload.id, role: payload.role };
  }
}
