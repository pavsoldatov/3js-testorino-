import { createContext } from "react";
import { BufferGeometry, Material, MeshPhysicalMaterial } from "three";

export interface AssetsContextType {
  verticalBalk?: BufferGeometry;
  horizontalBalk?: BufferGeometry;
  verticalBalkCorner?: BufferGeometry;
  lodge?: BufferGeometry;
  roofUnderlay?: BufferGeometry;
  wood1?: Material;
  wood2?: MeshPhysicalMaterial;
}

export const AssetsContext = createContext<AssetsContextType | undefined>(
  undefined
);
