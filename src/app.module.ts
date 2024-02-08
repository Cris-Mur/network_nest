import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './Auth/auth.controller';
import { AppService } from './app.service';
import { AuthService } from './Auth/auth.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
@Module({
  imports: [UserModule, PostModule],
  controllers: [AppController, AuthController, PostController],
  providers: [UserService, JwtService, AppService, AuthService, PostService],
})
export class AppModule {}
