import { Schema, model } from 'mongoose';

import { hashPassword, comparePassword } from '../../common/auth';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      hidden: true,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

UserSchema.pre('save', function encryptPasswordHook(next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  hashPassword,
  comparePassword,
};

const UserModel = model('User', UserSchema);

export default UserModel;
