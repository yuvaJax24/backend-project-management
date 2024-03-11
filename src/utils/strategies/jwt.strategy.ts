import { NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TOKEN_SECRET } from 'src/common/constants';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: TOKEN_SECRET.accessToken,
    });
  }

  async validate(payload: any) {
    if (!payload?.payload?.email) {
      throw new NotFoundException();
    }
    return payload;
  }
}
