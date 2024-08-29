import { Document } from 'mongoose';
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  deleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(password: string): Promise<boolean>;
}
