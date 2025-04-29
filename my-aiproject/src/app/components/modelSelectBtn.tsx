"use client";
import { useState } from "react";
import { useModelStore } from "@/store/modelStore";

export default function ModelSelectBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedModel, setSelectedModel } = useModelStore();

  const models = [
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "dall-e-3", name: "dall-e-3" },
  ];

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setIsOpen(false);
  };

  return (
    <div className=" left-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {models.find((model) => model.id === selectedModel)?.name}
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className=" z-10 w-48 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => handleModelSelect(model.id)}
                className={`block w-full px-4 py-2 text-sm text-left ${
                  selectedModel === model.id
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
