import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  Id: string;

  @Prop()
  fullName: string;

  @Prop()
  age: number;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  post: Array<object>;

  @Prop()
  createAt: Date;

  @Prop()
  updateAt: Date;

  @Prop()
  deleteAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
