import { createContext } from "react";
import { BufferGeometry, MeshStandardMaterial } from "three";

export interface AssetsContextType {
  balkGeometry?: BufferGeometry;
  cornerGeometry?: BufferGeometry;
  material?: MeshStandardMaterial;
}

export const AssetsContext = createContext<AssetsContextType | undefined>(
  undefined
);
