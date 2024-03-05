import { Injectable } from '@nestjs/common';
import { User } from './users/models/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService, private readonly jwtService: JwtService) { }
  async login(user: User, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id
    }
    const expires = new Date()
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    )
    const token = this.jwtService.sign(tokenPayload)
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    })
    return token
  }

}
