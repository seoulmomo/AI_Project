import openai from "@/lib/openai";
import { useModelStore } from "@/store/modelStore";

export async function generateChat(prompt: string, model: string) {
  // const { selectedModel } = useModelStore();
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Chat API Error:", error);
    throw error;
  }
}
