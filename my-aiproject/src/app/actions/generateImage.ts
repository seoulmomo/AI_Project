"use server";
import { generateImage } from "@/lib/openai/image";

export async function generateImageAction(prompt: string, model: string) {
  try {
    const result = await generateImage(prompt, model);
    return { success: true, url: result.url };
  } catch (error) {
    console.error("Image generation error:", error);
    return { success: false, error: "이미지 생성에 실패했습니다." };
  }
}
