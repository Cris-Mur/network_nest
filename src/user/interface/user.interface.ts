import { Document } from 'mongoose';

export interface User extends Document {
  readonly Id: string;
  readonly fullName: string;
  readonly age: number;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;
}
