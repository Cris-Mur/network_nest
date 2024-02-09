import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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
      createAt: new Date(),
      post: [],
      updateAt: null,
      deleteAt: null,
    };
    const result = new this.userModel(newUser);
    return result.save();
  }

  async updateUser(email: string, update: User): Promise<object> {
    update.updateAt = new Date();
    const result = this.userModel.updateOne({ email }, update);
    result.exec();
    return this.findOne(email);
  }
}
