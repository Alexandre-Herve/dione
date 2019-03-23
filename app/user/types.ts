import * as mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  name: string,
  email: string,
  password_hash: string,
  createdAt: Date,
  updatedAt: Date
}
