import { createContext } from "react";
import { BufferGeometry, Material, MeshPhysicalMaterial } from "three";

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

  ruberoid1?: MeshPhysicalMaterial;
  ruberoid2?: MeshPhysicalMaterial;
  wood1?: Material;
  wood2?: MeshPhysicalMaterial;
  roofEdgeMaterials?: { [key: string]: Material };
}

export const AssetsContext = createContext<AssetsContextType | undefined>(
  undefined
);
