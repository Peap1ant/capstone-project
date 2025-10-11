const mongoose = require("mongoose");

// 스키마 정의 (DB에 들어가는 데이터 구조)
const ComfortMessageSchema = new mongoose.Schema({
  text: { type: String, required: true },  // 위로 글
});

// 모델 생성
module.exports = mongoose.model("ComfortMessage", ComfortMessageSchema);
