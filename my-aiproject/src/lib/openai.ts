import OpenAI from "openai";

// API 키 관리 중앙화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
