import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    const emailrex = new RegExp(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'g',
    );
    if (!emailrex.test(email)) {
      throw new BadRequestException();
    }

    let user = await this.userService.findOne(email);
    if (!user) {
      this.userService.createUser(signInForm);
    } else if (password === signInForm.password) {
      return this.login({ email, password });
    } else {
      throw new UnauthorizedException();
    }
    user = await this.userService.findOne(email);
    const payload = { sub: user?.email, username: user.fullName };
    console.log(jwtConstants.secret);
    user.login = true;
    this.userService.updateUser(user.email, user);
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
      throw new UnauthorizedException();
    }
    const payload = { sub: user?.email, username: user.fullName };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '300s',
      secret: jwtConstants.secret,
    });
    user.lastLogin = new Date();
    user.login = true;
    this.userService.updateUser(user.email, user);
    return {
      access_token: token,
    };
  }

  async logout(email: string): Promise<string> {
    console.log('[email]', email);
    const user = await this.userService.findOne(email);
    user.login = false;
    this.userService.updateUser(email, user);
    return 'Done';
  }
}
