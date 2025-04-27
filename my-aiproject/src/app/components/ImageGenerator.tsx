"use client";
import Image from "next/image";
import { useState } from "react";
import { useModelStore } from "@/store/modelStore";
import { generateImageAction } from "../actions/generateImage";

export default function ImageGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { selectedModel } = useModelStore();

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  // <서버액션 사용 안할시>
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const result = await generateImageAction(prompt, selectedModel);
  //     if (result.success) {
  //       setImageUrl(result.url || ""); // Ensure url is never undefined
  //     } else {
  //       console.error(result.error);
  //     }
  //   } catch (error) {
  //     console.error("에러가 발생했습니다.", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  async function handleSubmit(formData: FormData) {
    const prompt = formData.get("prompt") as string;
    if (!prompt) return;

    setIsLoading(true);
    try {
      const result = await generateImageAction(prompt, selectedModel);
      if (result.success) {
        setImageUrl(result.url || "");
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("에러가 발생했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form action={handleSubmit} className="flex gap-4 items-center">
        <input
          type="text"
          value={prompt}
          placeholder="이미지 설명을 입력하세요"
          onChange={onChangeText}
          className="border border-slate-600 px-4 py-2 rounded-md"
          name="prompt"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? "생성 중" : "이미지 생성"}
        </button>
      </form>
      {imageUrl && (
        <div className="mt-4">
          <Image
            src={imageUrl}
            alt="Generated content"
            width={512}
            height={512}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
