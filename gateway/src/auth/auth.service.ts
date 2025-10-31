import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    private readonly jwtService: JwtService
  ) {}

  async signIn(username: string, password: string) {
    const user = await lastValueFrom(
      this.authClient.send({ cmd: 'login' }, { username, password })
    );

    if (!user || !user.access_token) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async getProfile(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    return lastValueFrom(this.authClient.send({ cmd: 'getProfile' }, payload));
  }
}
