import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schemas/user.schema';

import { UserModelDto } from './models/user.model.dto';

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
  async createUser(user: User): Promise<User> {
    const result = new this.userModel(user);
    return result.save();
  }
}
