import { Controller, Post, Body, Get, Request, UseGuards, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../strategies/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.signIn(body.username, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    return req.user; // AuthGuard يتحقق من JWT
  }
}
