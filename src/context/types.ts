import { Dispatch, SetStateAction } from "react";

export interface BalksConfig {
  width: number;
  depth: number;
}

export interface GridDimensions {
  width: number;
  depth: number;
}

export interface BalksContextType {
  config: BalksConfig;
  setConfig: Dispatch<SetStateAction<BalksConfig>>;
}
