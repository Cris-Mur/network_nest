import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { AuthSignInUserDto } from './models/auth.signin.user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthlogInUserDto } from './models/auth.login.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  getRefresh(token: string): object {
    return {
      refresh: randomBytes(16).toString('hex'),
      token,
    };
  }
  async signIn(
    signInForm: AuthSignInUserDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = signInForm;
    const user = await this.userService.findOne(email);
    if (user?.password !== password) {
      throw new Error('User Already exists');
    }
    const payload = { sub: user?.Id, username: user.fullName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(loginForm: AuthlogInUserDto): Promise<{ access_token: string }> {
    const { email, password } = loginForm;
    const user = await this.userService.findOne(email);
    if (user?.password !== password) {
      throw new Error('User Already exists');
    }
    const payload = { sub: user?.Id, username: user.fullName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  logout(token: string): string {
    console.debug(token);
    return 'Done';
  }
}
