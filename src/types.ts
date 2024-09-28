import { Euler } from "@react-three/fiber";
import { Dispatch, SetStateAction } from "react";
import { Vector3Tuple } from "three";

export interface BalkInstance {
  position: Vector3Tuple;
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