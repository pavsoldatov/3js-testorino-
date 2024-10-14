import { useContext } from "react";
import { AssetsContext } from "../context/AssetsContext/AssetsContext";

export function useAssets() {
  const context = useContext(AssetsContext);
  if (context === undefined) {
    throw new Error("useAssets must be used within an AssetProvider");
  }
  return context;
}
