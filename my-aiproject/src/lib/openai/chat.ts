import openai from "@/lib/openai";
import { useModelStore } from "@/store/modelStore";

export async function generateChat(prompt: string, model: string) {
  // const { selectedModel } = useModelStore();
  try {
    const stream = await openai.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    if (!stream) {
      throw new Error("Failed to create chat stream");
    }

    return stream;
  } catch (error) {
    console.error("Chat API Error:", error);
    throw error;
  }
}
