import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() data: { username: string; password: string }) {
    return this.authService.signIn(data.username, data.password);
  }

  @MessagePattern({ cmd: 'getProfile' })
  async getProfile(@Payload() user: any) {
    return user; 
  }
}
