import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateAIContent } from './api.js';  // The AI content generation function

const app = express();
const PORT = 3000;

// To get the current directory in ES module format
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (e.g., HTML, JS, CSS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies for POST requests
app.use(express.json());

// Route to handle AI content generation
app.post('/generate-content', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const aiContent = await generateAIContent(prompt);
    res.json({ text: aiContent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate AI content' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
