"use client";
import ImageGenerator from "./components/ImageGenerator";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center justify-center h-screen">
        <ImageGenerator />
      </main>
    </div>
  );
}
