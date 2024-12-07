import { GoogleGenerativeAI } from '@google/generative-ai';

const api_key = 'AIzaSyCqy5Se5BIt1iM_gIKdvyDOxTUdssVcwCk'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(api_key);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateAIContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();  // Return the generated AI content as text
  } catch (error) {
    console.error('Error generating AI content:', error);
    throw error;
  }
}
