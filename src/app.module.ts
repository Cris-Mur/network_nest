import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './Auth/auth.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AuthController, AppController],
  providers: [AppService],
})
export class AppModule {}
