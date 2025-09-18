import { create } from "zustand";

export type ShapeKind = "Rectangle" | "Circle" | "Diamond" | "square" | "";

interface ShapeState {
  shape: ShapeKind;
  setShape: (shape: ShapeKind) => void;
}

export const useShapeStore = create<ShapeState>((set) => ({
  shape: "",
  setShape: (shape) => set({ shape }),
}));
