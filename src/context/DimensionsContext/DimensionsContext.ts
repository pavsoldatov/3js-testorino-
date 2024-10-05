import { createContext, Dispatch, SetStateAction } from "react";

export interface Dimensions {
  width: number;
  depth: number;
}

export interface DimensionsType {
  dimensions: Dimensions;
  setDimensions: Dispatch<SetStateAction<Dimensions>>;
}

export const DimensionsContext = createContext<DimensionsType | undefined>(
  undefined
);
