import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import 'dotenv/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SERECT_JWT,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return 1;
    // const { email, username } = payload;

    // const user: any = await this.userRepository.findOneBy({
    //   email,
    //   username,
    // });

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    // return user;
  }
}
