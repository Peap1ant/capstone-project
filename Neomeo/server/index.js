const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우터 등록
const comfortRoutes = require("./routes/comfort");
app.use("/api/comfort", comfortRoutes);

// DB 연결
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB 연결 성공");
    app.listen(PORT, () => console.log(`🚀 서버 실행: http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB 연결 실패:", err));
