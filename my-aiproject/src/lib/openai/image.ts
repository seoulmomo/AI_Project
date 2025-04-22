import openai from "@/lib/openai";

export async function generateImage(
  prompt: string,
  model: string = "dall-e-3"
) {
  try {
    const response = await openai.images.generate({
      model,
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid",
      response_format: "url",
      user: "user-identifier",
    });

    return {
      url: response.data[0].url,
    };
  } catch (error) {
    console.error("DALL-E API Error:", error);
    throw error;
  }
}
