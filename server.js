const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/get-ai-response", (req, res) => {
  const { message } = req.body;
  const lowerMessage = message.toLowerCase();

  let response = "Tôi chưa hiểu ý bạn, bạn có thể nói rõ hơn không?";
  if (lowerMessage.includes("xin chào")) {
    response = "Xin chào! Tôi có thể giúp gì cho bạn?";
  } else if (lowerMessage.includes("bạn là ai")) {
    response = "Tôi là AI chatbox của bạn!";
  } else if (lowerMessage.includes("tạm biệt")) {
    response = "Hẹn gặp lại bạn nhé!";
  }

  res.json({ reply: response });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Fake AI API server is running on http://localhost:${PORT}`);
});
