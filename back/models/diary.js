import { Schema, model, ObjectId } from 'mongoose'

const schema = new Schema({
  user_id: {
    type: ObjectId,
    ref: 'users',
    required: [true, '缺少使用者']
  },
  visibility: {
    type: Boolean,
    required: [true, '缺少可見狀態']
  },
  image: {
    type: String,
    required: [true, '缺少日記圖片']
  },
  content: {
    type: String,
    required: [true, '缺少日記內容']
  },
  create_at: {
    type: Date,
    required: [true, '缺少日記日期']
  },
  weather: {
    type: String,
    required: [true, '缺少天氣選擇'],
    enum: {
      values: ['晴天', '雨天', '陰天'],
      message: '天氣分類錯誤'
    }
  }

}, {
  timestamps: true,
  versionKey: false
})

export default model('diary', schema)
