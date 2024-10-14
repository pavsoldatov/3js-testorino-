import { createContext } from "react";
import { BufferGeometry, Material } from "three";

export interface Metals {
  whiteMetal: Material;
  silverMetal: Material;
  blackMetal: Material;
}

export interface Ruberoids {
  ruberoid1: Material;
  ruberoid2: Material;
}

export interface Woods {
  wood1: Material;
  wood2: Material;
  wood3: Material;
}

export interface AssetsContextType {
  verticalBalk?: BufferGeometry;
  horizontalBalk?: BufferGeometry;
  verticalBalkCorner?: BufferGeometry;
  lodge?: BufferGeometry;
  roofUnderlay?: BufferGeometry;
  roofUnderlayLodge?: BufferGeometry;
  roofUnderlaySideLodge?: BufferGeometry;
  roof?: BufferGeometry;
  roofEdgeStraight?: BufferGeometry;
  roofEdgeRounded?: BufferGeometry;
  roofEdgeCornerStraight?: BufferGeometry;
  roofEdgeCornerRounded?: BufferGeometry;

  ruberoids?: Ruberoids;
  woods?: Woods;
  metals?: Metals;
}

export const AssetsContext = createContext<AssetsContextType | undefined>(
  undefined
);
