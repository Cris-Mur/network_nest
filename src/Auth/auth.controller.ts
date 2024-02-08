import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { AuthSignInUserDto } from './models/auth.signin.user.dto';
import { AuthlogInUserDto } from './models/auth.login.user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get('/refresh')
  @ApiHeader({
    name: 'X-Auth',
    description: 'Custom auth header',
  })
  getRefresh(@Request() Req): object {
    const usrToken = Req.headers['x-auth'];
    console.log(usrToken);
    return this.appService.getRefresh(usrToken);
  }
  @Post('/register')
  postRegister(@Body() signInForm: AuthSignInUserDto): object {
    return this.appService.signIn(signInForm);
  }
  @Post('/login')
  postlogin(@Body() loginForm: AuthlogInUserDto): object {
    return { response: this.appService.login(loginForm) };
  }
  @Post('/logout')
  @ApiHeader({
    name: 'X-Auth',
    description: 'Custom auth header',
  })
  postLogout(@Request() Req): object {
    const usrToken = Req.headers['x-auth'];
    console.log(usrToken);
    return { response: this.appService.logout(usrToken) };
  }
}
