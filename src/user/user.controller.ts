import { Controller, Get, Put, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @ApiHeader({
    name: 'X-Auth',
    description: 'Custom auth header',
  })
  getUser(@Param('id') id: string): object {
    return {};
  }
  @Put(':id')
  @ApiHeader({
    name: 'X-Auth',
    description: 'Custom auth header',
  })
  updateUser(@Param('id') id: string): object {
    return { id };
  }
  @Delete(':id')
  @ApiHeader({
    name: 'X-Auth',
    description: 'Custom auth header',
  })
  deleteUser(@Param('id') id: string): object {
    return {
      deleteAt: Date(),
    };
  }
}
