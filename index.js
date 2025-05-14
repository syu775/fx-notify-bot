// Slack通知Bot本体（Renderなどで実行可）

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// POSTリクエスト受信時にSlackへ通知
app.post('/notify', async (req, res) => {
  const { message, webhookUrl } = req.body;

  if (!message || !webhookUrl) {
    return res.status(400).json({ error: 'message と webhookUrl は必須です' });
  }

  try {
    await axios.post(webhookUrl, { text: message });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Slack送信失敗', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('FX通知Bot起動中');
});

app.listen(PORT, () => {
  console.log(`サーバー起動完了: http://localhost:${PORT}`);
});
