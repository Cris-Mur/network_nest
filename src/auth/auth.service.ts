import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { AuthSignInUserDto } from './models/auth.signin.user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthlogInUserDto } from './models/auth.login.user.dto';
import { jwtConstants } from './constants';

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
    let user = await this.userService.findOne(email);
    if (!user) {
      this.userService.createUser(signInForm);
    } else if (password === signInForm.password) {
      return this.login({ email, password });
    } else {
      throw new Error('Unathorized');
    }
    user = await this.userService.findOne(email);
    const payload = { sub: user?.Id, username: user.fullName };
    console.log(jwtConstants.secret);
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '300s',
        secret: jwtConstants.secret,
      }),
    };
  }

  async login(loginForm: AuthlogInUserDto): Promise<{ access_token: string }> {
    const { email, password } = loginForm;
    const user = await this.userService.findOne(email);
    if (user?.password !== password) {
      throw new Error('User Already exists');
    }
    const payload = { sub: user?.Id, username: user.fullName };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '300s',
      secret: jwtConstants.secret,
    });
    user.lastLogin = new Date();
    this.userService.updateUser(user.email, user);
    return {
      access_token: token,
    };
  }
  logout(token: string): string {
    console.debug(token);
    return 'Done';
  }
}
