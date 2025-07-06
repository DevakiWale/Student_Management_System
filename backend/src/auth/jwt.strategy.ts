import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
  (req: Request) => req?.cookies?.token || null,
]),
      //ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'DevakiSuperSecret123',
       passReqToCallback: false,
    });
  }

  async validate(payload: any) {
    console.log('✅ JWT validated payload:', payload);
    return {
      id: Number(payload.sub),
      email: payload.email, 
      role: payload.role };

  }
}   
