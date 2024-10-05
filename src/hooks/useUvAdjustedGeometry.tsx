import { useMemo } from "react";
import { BufferGeometry, Vector3 } from "three";

interface AdjustGeometryProps {
  geometry?: BufferGeometry;
  scale: Vector3;
  offset?: number;
  scaleFactor?: number;
}

export function useUvAdjustedGeometry({
  geometry,
  scale,
  scaleFactor = 0.5,
}: AdjustGeometryProps) {
  return useMemo(() => {
    if (!geometry) return;

    const clonedGeometry = geometry.clone();
    const uvAttribute = clonedGeometry.attributes.uv;
    const uvs = uvAttribute.array;

    for (let i = 0; i < uvs.length; i += 2) {
      // Apply scaling
      uvs[i] *= scale.x * scaleFactor;
    }

    uvAttribute.needsUpdate = true;
    return clonedGeometry;
  }, [geometry, scale.x, scaleFactor]);
}
