"use client";
import Chat from "./components/Chat";
import ImageGenerator from "./components/ImageGenerator";
import { useModelStore } from "@/store/modelStore";
import ModelSelectBtn from "./components/modelSelectBtn";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/store/themeStore";

export default function Home() {
  const { selectedModel } = useModelStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  useEffect(() => {
    console.log(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <main className="flex h-screen bg-white dark:bg-gray-500">
      {/* 사이드바 */}
      <div
        className={`relative w-[260px] flex flex-col border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[260px]"
        }`}
      >
        {/* 사이드바 헤더 */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            새 채팅
          </button>
          {isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* 모델 선택 */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <ModelSelectBtn />
        </div>

        {/* 다크모드 토글 버튼 */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <span>다크모드</span>
            <div className="relative w-10 h-6 bg-gray-200 dark:bg-gray-600 rounded-full transition-colors">
              <div
                className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                  isDarkMode ? "left-5" : "left-1"
                }`}
              />
            </div>
          </button>
        </div>

        {/* 대화 기록 */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-2">
            {/* 예시 대화 기록 */}
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
              이전 대화 1
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
              이전 대화 2
            </button>
          </div>
        </div>
      </div>

      {/* 사이드바 토글 버튼 (닫혀있을 때만 표시) */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-center">
          {selectedModel === "dall-e-3" ? <ImageGenerator /> : <Chat />}
        </main>
      </div>
    </main>
  );
}
