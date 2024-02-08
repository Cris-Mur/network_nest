import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('api')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Redirect('/api/', 301)
  getApiRoot(): void {
    return;
  }
}
