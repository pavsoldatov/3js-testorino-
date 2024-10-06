import { useMemo } from "react";
import { BufferGeometry, Vector3 } from "three";

interface AdjustGeometryXProps {
  geometry?: BufferGeometry;
  scale: Vector3;
  scaleFactor?: number;
}

export function useUvAdjustedGeometryX({
  geometry,
  scale,
  scaleFactor = 0.5,
}: AdjustGeometryXProps) {
  return useMemo(() => {
    if (!geometry) return;

    const clonedGeometry = geometry.clone();
    const uvAttribute = clonedGeometry.attributes.uv;
    const uvs = uvAttribute.array;

    // Adjust UVs based on the X-axis scaling
    for (let i = 0; i < uvs.length; i += 2) {
      uvs[i] *= scale.x * scaleFactor; // Adjust along X-axis
    }

    uvAttribute.needsUpdate = true;
    return clonedGeometry;
  }, [geometry, scale.x, scaleFactor]);
}
