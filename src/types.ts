import { Vector3, Euler } from "three";
import { Dispatch, SetStateAction } from "react";

export interface BalkInstance {
  position: Vector3;
  rotation: Euler;
}

export type CornerInstance = BalkInstance;

export interface BalksConfig {
  width: number;
  depth: number;
}

export interface BalksContextType {
  config: BalksConfig;
  setConfig: Dispatch<SetStateAction<BalksConfig>>;
}