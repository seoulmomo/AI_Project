"use server";

import { generateChat } from "@/lib/openai/chat";

export async function streamChatResponse(prompt: string, model: string) {
  try {
    const stream = await generateChat(prompt, model);
    if (!stream) {
      throw new Error("No stream returned from generateChat");
    }

    let response = "";
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        response += content;
      }
    }

    return { content: response };
  } catch (error) {
    console.error("Chat streaming error:", error);
    throw error;
  }
}
