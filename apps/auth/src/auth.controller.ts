import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGaurd } from './guards/local-auth.guard';
import { User } from './users/models/user.entity';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.gaurd';
import { CurrentUser } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @UseGuards(LocalAuthGaurd)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response
  ) {
    const jwt = await this.authService.login(user, response)
    response.json(jwt)
  }



  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data) {
    console.log("🚀 ~ AuthController ~ authenticate ~ data:", data)
    return data.user
  };
}
