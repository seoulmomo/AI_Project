"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useModelStore } from "@/store/modelStore";
import { streamChatResponse } from "../actions/chat";

interface Message {
  role: "user" | "assistant" | "";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "", content: "" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { selectedModel } = useModelStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (role: Message["role"], content: string) => {
    setMessages((prev) => [...prev, { role, content }]);
  };

  const getMessageStyle = (role: Message["role"]) => {
    return role === "user"
      ? "justify-end bg-blue-500 text-white"
      : "justify-start bg-gray-200 text-gray-800";
  };

  async function handleFormSubmit(formData: FormData) {
    const prompt = formData.get("prompt") as string;
    if (!prompt) return;

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setInput("");
    setIsLoading(true);
    try {
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      const response = await streamChatResponse(prompt, selectedModel);

      setMessages((prev) => {
        const newMessages = [...prev];
        // const lastMessage = newMessages[newMessages.length - 1].content;
        if (newMessages[newMessages.length - 1].content !== "") {
          return newMessages;
        } else {
          newMessages[newMessages.length - 1].content = response.content;
        }
        newMessages[newMessages.length - 1].content = response.content;

        return newMessages;
      });
      console.log("newMessage", messages);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // <서버액션 사용 안할시>
  // async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault(); // FormData 방식 대신 FormEvent로 수정 (일반적)
  //   if (!input.trim()) return;

  //   const prompt = input.trim();
  //   addMessage("user", prompt);
  //   setInput("");
  //   setIsLoading(true);

  //   try {
  //     addMessage("assistant", ""); // 빈 assistant 메시지 미리 추가
  //     const response = await streamChatResponse(prompt, selectedModel);

  //     setMessages((prev) => {
  //       const updated = [...prev];
  //       const lastIndex = updated.length - 1;
  //       if (updated[lastIndex].role === "assistant") {
  //         updated[lastIndex].content = response.content;
  //       }
  //       return updated;
  //     });
  //   } catch (error) {
  //     console.error("Chat error:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 w-[640px]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            } 
            ${message.role === "" ? "hidden" : ""}
            `}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form action={handleFormSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 p-2 border rounded-md"
            disabled={isLoading}
            name="prompt"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? "전송 중..." : "전송"}
          </button>
        </div>
      </form>
    </div>
  );
}
