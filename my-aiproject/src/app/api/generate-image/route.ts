import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid",
      response_format: "url",
      user: "user-identifier",
    });

    return NextResponse.json({
      url: response.data[0].url,
    });
  } catch (error) {
    console.error("DALL-E API Error:", error);
    return new NextResponse(
      JSON.stringify({
        error: "이미지 생성 실패",
        details: error instanceof Error ? error.message : "알 수 없는 오류",
      }),
      { status: 500 }
    );
  }
}
