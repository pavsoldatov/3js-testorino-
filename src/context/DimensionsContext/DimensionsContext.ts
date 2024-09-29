import { createContext, Dispatch, SetStateAction } from "react";

export interface Dimensions {
  width: number;
  depth: number;
}

export interface DimensionsType {
  config: Dimensions;
  setConfig: Dispatch<SetStateAction<Dimensions>>;
}

export const DimensionsContext = createContext<DimensionsType | undefined>(
  undefined
);
