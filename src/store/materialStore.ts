import { create } from "zustand";
import { Metals, Ruberoids, Woods } from "../context/AssetsContext/AssetsContext";

interface MaterialStoreState {
  roofMetalness: number;
  roofRoughness: number;

  selectedRoofEdgeMaterialKey: keyof Metals;
  selectedRoofMaterialKey: keyof Ruberoids;
  selectedWoodMaterialKey: keyof Woods;

  setSelectedRoofEdgeMaterial: (materialKey: keyof Metals) => void;
  setSelectedRoofMaterial: (materialKey: keyof Ruberoids) => void;
  setSelectedBalkMaterial: (materialKey: keyof Woods) => void;

  setRoofMetalness: (value: number) => void;
  setRoofRoughness: (value: number) => void;
}

export const useMaterialStore = create<MaterialStoreState>((set) => ({
  // defaults
  roofMetalness: 1.5,
  roofRoughness: 0.7,

  // defaults
  selectedRoofEdgeMaterialKey: "whiteMetal",
  selectedRoofMaterialKey: "ruberoid1",
  selectedWoodMaterialKey: "wood1",

  setSelectedRoofEdgeMaterial: (key) =>
    set({ selectedRoofEdgeMaterialKey: key }),
  setSelectedRoofMaterial: (key) => set({ selectedRoofMaterialKey: key }),
  setSelectedBalkMaterial: (key) => set({ selectedWoodMaterialKey: key }),

  setRoofMetalness: (value) => set({ roofMetalness: value }),
  setRoofRoughness: (value) => set({ roofRoughness: value }),
}));
