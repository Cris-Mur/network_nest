import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { AuthSignInUserDto } from './models/auth.signin.user.dto';
import { AuthlogInUserDto } from './models/auth.login.user.dto';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/refresh')
  @ApiHeader({
    name: 'authorization',
    description: 'Custom auth header',
  })
  getRefresh(@Request() Req): object {
    const usrToken = Req.headers['authorization'];
    console.log(usrToken);
    return this.authService.getRefresh(usrToken);
  }
  @Post('/register')
  postRegister(@Body() signInForm: AuthSignInUserDto): object {
    return this.authService.signIn(signInForm);
  }
  @Post('/login')
  postlogin(@Body() loginForm: AuthlogInUserDto): object {
    return this.authService.login(loginForm);
  }
  @Post('/logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  postLogout(@Request() Req): object {
    const usrToken = Req.headers['authorization'];
    console.log(usrToken);
    return { response: this.authService.logout(usrToken) };
  }
}
