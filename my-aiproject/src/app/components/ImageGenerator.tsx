"use client";
import Image from "next/image";
import { useState, useCallback } from "react";

export default function ImageGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onChangeText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        const response = await fetch(`/api/generate-image`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        setImageUrl(data.url);
      } catch (error) {
        console.error("에러가 발생했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    },
    [prompt]
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="gap-4">
        <input
          type="text"
          value={prompt}
          placeholder="이미지 설명을 입력하세요"
          onChange={onChangeText}
          className="border border-slate-600"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="border border-black"
        >
          {isLoading ? "생성 중" : "이미지 생성"}
        </button>
      </form>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Generated content"
          width={512}
          height={512}
        />
      )}
    </div>
  );
}
