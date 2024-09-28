import { BalkInstance, CornerInstance } from "../types";

export const balks: BalkInstance[] = [
  { position: [0, 0, 0], rotation: [0, 0, 0] },
  { position: [3, 0, 0], rotation: [0, 0, 0] },
  { position: [3, 0, 5], rotation: [0, 0, 0] },
  { position: [0, 0, 5], rotation: [0, 0, 0] },
];

export const corners: CornerInstance[] = [
  { position: [0, 0, 0], rotation: [0, Math.PI * 2, 0] },
  { position: [0, 0, 0], rotation: [0, Math.PI * 1.5, 0] },
  { position: [3, 0, 0], rotation: [0, Math.PI * 1.5, 0] },
  { position: [3, 0, 0], rotation: [0, Math.PI, 0] },
  { position: [3, 0, 5], rotation: [0, Math.PI, 0] },
  { position: [3, 0, 5], rotation: [0, Math.PI * 0.5, 0] },
  { position: [0, 0, 5], rotation: [0, Math.PI * 0.5, 0] },
  { position: [0, 0, 5], rotation: [0, Math.PI * 2, 0] },
];
