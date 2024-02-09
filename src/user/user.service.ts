import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

import { User } from './schemas/user.schema';

import { UserModelDto } from './models/user.model.dto';
import { UserCreateDto } from './models/user.create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: mongoose.Model<User>,
  ) {}
  async findOne(email: string): Promise<User> {
    const user = this.userModel.findOne({ email }).exec();
    return user;
  }
  async createUser(user: UserCreateDto): Promise<User> {
    const newUser: UserModelDto = {
      ...user,
      iduser: uuidv4(),
      createAt: new Date(),
      post: [],
      updateAt: new Date(),
      deleteAt: null,
    };
    const result = new this.userModel(newUser);
    return result.save();
  }

  async updateUser(email: string, update: User): Promise<object> {
    console.log('update', update);
    return this.findOne(email);
  }
}
