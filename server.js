require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

async function ask(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

app.post('/api/ideas', async (req, res) => {
  const { niche } = req.body;
  const text = await ask(
    `Generate 10 creative Instagram Reel ideas for a content creator in the "${niche}" niche.
     Format as a numbered list. Each idea should be catchy, trending, and engaging.
     Write in a mix of Hindi and English (Hinglish) style.`
  );
  res.json({ result: text });
});

app.post('/api/caption', async (req, res) => {
  const { topic } = req.body;
  const text = await ask(
    `Write 3 different Instagram captions for a Reel about "${topic}".
     Make them engaging, with emojis, and a call to action.
     Mix Hindi and English naturally. Include relevant hashtags at the end of each.`
  );
  res.json({ result: text });
});

app.post('/api/hashtags', async (req, res) => {
  const { topic } = req.body;
  const text = await ask(
    `Give me 30 best Instagram hashtags for a Reel about "${topic}".
     Mix popular and niche hashtags. Include some Hindi hashtags too.
     Format them ready to copy-paste.`
  );
  res.json({ result: text });
});

app.post('/api/schedule', async (req, res) => {
  const { niche, frequency } = req.body;
  const text = await ask(
    `Create a ${frequency}-day Instagram content schedule for a "${niche}" content creator.
     For each day include: best posting time, content type, and topic idea.
     Format as a clear day-by-day plan.`
  );
  res.json({ result: text });
});

app.listen(3000, () => console.log('App chal rahi hai: http://localhost:3000'));
