import { Schema, model, ObjectId } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import UserRole from '../enums/UserRole'

// 收藏夾
const favdiarySchema = new Schema({
  name: {
    type: String,
    required: [true, '缺少收藏夾名稱']
  },
  diaries: [{
    type: ObjectId,
    ref: 'Diary'
  }]
})

const schema = new Schema({
  account: {
    type: String,
    required: [true, '缺少使用者帳號'],
    minlength: [4, '帳號最少4個字'],
    maxlength: [20, '帳號最多20個字'],
    unique: [true, '帳號已被註冊'],
    validate: {
      validator (value) {
        return validator.isAlphanumeric(value)
      },
      message: '使用者帳號格式錯誤'
    }
  },
  email: {
    type: String,
    required: [true, '缺少使用者信箱'],
    unique: [true, '信箱已被註冊'],
    validate: {
      validator (value) {
        return validator.isEmail(value)
      },
      message: '使用者信箱格式錯誤'
    }
  },
  password: {
    type: String,
    required: [true, '缺少使用者密碼']
  },
  tokens: {
    type: [String]
  },
  favdiary: {
    type: [favdiarySchema] // 收藏夾
  },
  role: {
    type: Number,
    default: UserRole.USER
  }
}, {
  timestamps: true,
  versionKey: false
})

schema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if (user.password.length < 4 || user.password.length > 20) {
      const error = new Error.ValidationError(null)
      error.addError('password', new Error.ValidationError({ message: '密碼長度需介於4~20之間' }))
      next(error)
    } else {
      user.password = bcrypt.hashSync(user.password, 10)
    }
  }
  next()
})

export default model('users', schema)
