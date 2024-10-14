import { create } from "zustand";
import { DEFAULT_BALK_WIDTH, DEFAULT_BALK_DEPTH } from "../constants";

interface DimensionsState {
  width: number;
  depth: number;
  setWidth: (width: number) => void;
  setDepth: (depth: number) => void;
}

export const useDimensionsStore = create<DimensionsState>((set) => ({
  width: DEFAULT_BALK_WIDTH,
  depth: DEFAULT_BALK_DEPTH,
  setWidth: (width) => set({ width }),
  setDepth: (depth) => set({ depth }),
}));
