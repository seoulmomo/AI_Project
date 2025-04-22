import { create } from "zustand";

interface ModelState {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export const useModelStore = create<ModelState>((set) => ({
  selectedModel: "gpt-3.5-turbo",
  setSelectedModel: (model) => set({ selectedModel: model }),
}));
