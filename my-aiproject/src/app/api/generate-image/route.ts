import { NextResponse } from "next/server";
import { generateImage } from "@/lib/openai/image";

export async function POST(req: Request) {
  try {
    const { prompt, model } = await req.json();
    const result = await generateImage(prompt, model);
    return NextResponse.json(result);
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
