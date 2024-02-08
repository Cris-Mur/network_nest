import { Injectable } from '@nestjs/common';
import { UserModelDto } from './models/user.model.dto';

@Injectable()
export class UserService {
  async findOne(email: string): Promise<UserModelDto> {
    return {
      Id: 'uuid',
      email,
      fullName: 'Test',
      password: 'pass',
      age: 1,
      post: [{}],
      createAt: new Date(),
      deleteAt: new Date(),
      updateAt: new Date(),
    };
  }
}
