const express = require("express");
const router = express.Router();
const ComfortMessage = require("../models/ComfortMessage");

// 랜덤 글 가져오기
router.get("/random", async (req, res) => {
  try {
    const count = await ComfortMessage.countDocuments(); // 총 몇 개 글이 있는지
    const random = Math.floor(Math.random() * count);
    const message = await ComfortMessage.findOne().skip(random); // 랜덤으로 하나 가져오기
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: "랜덤 메시지를 불러오지 못했어요." });
  }
});

// 새 글 추가 (테스트용)
router.post("/", async (req, res) => {
  try {
    const newMessage = new ComfortMessage({ text: req.body.text });
    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "메시지를 저장하지 못했어요." });
  }
});

module.exports = router;