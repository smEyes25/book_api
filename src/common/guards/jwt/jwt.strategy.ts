import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: Constants.JWT_SECRET_KEY,
      secretOrKey: 'This is my secret key',
    });
  }

  async validate(payload: any) {
    return {
      username: payload.username,
    };
  }
}
