import { Euler, Vector3 } from "three";
import { BalkInstance, CornerInstance } from "../types";

export const balks: BalkInstance[] = [
  { position: new Vector3(0, 0, 0), rotation: new Euler(0, 0, 0) },
  { position: new Vector3(3, 0, 0), rotation: new Euler(0, 0, 0) },
  { position: new Vector3(3, 0, 5), rotation: new Euler(0, 0, 0) },
];

export const corners: CornerInstance[] = [
  {
    position: new Vector3(0, 0, 0),
    rotation: new Euler(0, Math.PI * 2, 0),
  },
  {
    position: new Vector3(0, 0, 0),
    rotation: new Euler(0, Math.PI * 1.5, 0),
  },
  {
    position: new Vector3(3, 0, 0),
    rotation: new Euler(0, Math.PI * 1.5, 0),
  },
  {
    position: new Vector3(3, 0, 0),
    rotation: new Euler(0, Math.PI, 0),
  },
  {
    position: new Vector3(3, 0, 5),
    rotation: new Euler(0, Math.PI, 0),
  },
  {
    position: new Vector3(3, 0, 5),
    rotation: new Euler(0, Math.PI * 0.5, 0),
  },
  {
    position: new Vector3(0, 0, 5),
    rotation: new Euler(0, Math.PI * 0.5, 0),
  },
  {
    position: new Vector3(0, 0, 5),
    rotation: new Euler(0, Math.PI * 2, 0),
  },
];
