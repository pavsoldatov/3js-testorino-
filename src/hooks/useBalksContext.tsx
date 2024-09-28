import { useContext } from "react";
import { BalksContext } from "../context/BalksContext";
import { BalksContextType } from "../context/types";

export const useBalksContext = (): BalksContextType => {
  const context = useContext(BalksContext);
  if (!context) {
    throw new Error("useBalksContext must be used within a BalksProvider");
  }
  return context;
};
