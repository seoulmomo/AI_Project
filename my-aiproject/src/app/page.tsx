"use client";
import Chat from "./components/Chat";
import ImageGenerator from "./components/ImageGenerator";
import { useModelStore } from "@/store/modelStore";

export default function Home() {
  const { selectedModel } = useModelStore();
  return (
    <div>
      <main className="flex flex-col items-center justify-center h-screen">
        {selectedModel === "dall-e-3" ? <ImageGenerator /> : <Chat />}
      </main>
    </div>
  );
}
