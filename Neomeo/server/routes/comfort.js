const express = require("express");
const router = express.Router();
const ComfortMessage = require("../models/ComfortMessage");

// ✅ 랜덤으로 글 하나 가져오기
router.get("/random", async (req, res) => {
  try {
    const count = await ComfortMessage.countDocuments(); // 전체 글 개수
    const randomIndex = Math.floor(Math.random() * count); // 랜덤 인덱스
    const message = await ComfortMessage.findOne().skip(randomIndex); // 해당 인덱스 글 가져오기

    res.json(message); // JSON 응답
  } catch (error) {
    res.status(500).json({ error: "서버 에러 발생" });
  }
});

// ✅ 새 글 추가 (테스트용)
router.post("/", async (req, res) => {
  try {
    const newMessage = new ComfortMessage({
      text: req.body.text,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "저장 실패" });
  }
});

module.exports = router;