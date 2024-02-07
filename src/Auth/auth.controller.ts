import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../app.service';
import { ApiTags, ApiHeader } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiHeader({
  name: 'X-Auth',
  description: 'Custom auth header',
})
@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AppService) {}


  @Get('/refresh')
  getRefresh(): string {
    return this.appService.getHello();
  }

  @Post('/register')
  postRegister(): string {
    return this.appService.getHello();
  }
  @Post('/login')
  postlogin(): string {
    return this.appService.getHello();
  }
  @Post('/logout')
  postLogout(): string {
    return this.appService.getHello();
  }
}
