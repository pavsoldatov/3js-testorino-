import { create } from "zustand";

export type RoofEdgeType = "rounded" | "straight";

interface GeometryStoreState {
  selectedRoofEdgeGeometryKey: RoofEdgeType;
  setSelectedRoofEdgeGeometry: (key: RoofEdgeType) => void;
}

export const useGeometryStore = create<GeometryStoreState>((set) => ({
  // default
  selectedRoofEdgeGeometryKey: "straight",

  setSelectedRoofEdgeGeometry: (key) =>
    set({ selectedRoofEdgeGeometryKey: key }),
}));
