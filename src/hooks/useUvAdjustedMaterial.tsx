import { useMemo, useEffect } from "react";
import { Material, Texture } from "three";

export function useUvAdjustedMaterial<T extends Material>(
  material: T,
  scaleU: number,
  scaleV: number
): T {
  const adjustedMaterial = useMemo(() => {
    // Clone the base material
    const mat = material.clone() as T & { map?: Texture; normalMap?: Texture };

    if (mat.map) {
      mat.map = mat.map.clone();
      mat.map.repeat.set(scaleU, scaleV);
    }

    if (mat.normalMap) {
      mat.normalMap = mat.normalMap.clone();
      mat.normalMap.repeat.set(scaleU, scaleV);
    }

    return mat;
  }, [material, scaleU, scaleV]);

  // cleanup
  useEffect(() => {
    return () => {
      if (adjustedMaterial.map) adjustedMaterial.map.dispose();
      if (adjustedMaterial.normalMap) adjustedMaterial.normalMap.dispose();
      adjustedMaterial.dispose();
    };
  }, [adjustedMaterial]);

  return adjustedMaterial;
}
