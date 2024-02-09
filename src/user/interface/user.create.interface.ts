import { Document } from 'mongoose';

export interface CreateUser extends Document {
  readonly fullName: string;
  readonly age: number;
  readonly email: string;
  readonly password: string;
}
