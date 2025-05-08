import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'pending' },
  }],
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
