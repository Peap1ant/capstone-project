const mongoose = require("mongoose");

// 위로 글 스키마 정의
const comfortMessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true, // 글 내용은 반드시 있어야 함
  },
  createdAt: {
    type: Date,
    default: Date.now, // 생성 시각 자동 기록
  },
});

const ComfortMessage = mongoose.model("ComfortMessage", comfortMessageSchema);
module.exports = ComfortMessage;
