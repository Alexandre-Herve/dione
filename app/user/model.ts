import * as mongoose from 'mongoose'

import { IUser } from './types'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password_hash: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: false
  },
  updatedAt: {
    type: Date,
    required: false
  }
})

UserSchema.pre<IUser>('save', async function() {
  const user = this
  if (user) {
    let now = new Date()
    if (!user.createdAt) user.createdAt = now
    user.updatedAt = now
  }
  return this
})

const User = mongoose.model<IUser>('User', UserSchema);

export default User
