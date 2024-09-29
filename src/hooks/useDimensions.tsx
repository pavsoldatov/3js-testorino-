import { useContext } from "react";
import {
  DimensionsContext,
  DimensionsType,
} from "../context/DimensionsContext/DimensionsContext";

export const useDimensions = (): DimensionsType => {
  const context = useContext(DimensionsContext);
  if (!context) {
    throw new Error("useBalksContext must be used within a BalksProvider");
  }
  return context;
};
