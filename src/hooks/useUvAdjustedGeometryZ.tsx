import { useMemo } from "react";
import { BufferGeometry, Vector3 } from "three";

interface AdjustGeometryZProps {
  geometry?: BufferGeometry;
  scale: Vector3;
  scaleFactor?: number;
}

export function useUvAdjustedGeometryZ({
  geometry,
  scale,
  scaleFactor = 0.5,
}: AdjustGeometryZProps) {
  return useMemo(() => {
    if (!geometry) return;

    const clonedGeometry = geometry.clone();
    const uvAttribute = clonedGeometry.attributes.uv;
    const uvs = uvAttribute.array;

    // Adjust UVs based on the X-axis scaling
    for (let i = 0; i < uvs.length; i += 2) {
      uvs[i] *= scale.z * scaleFactor; // Adjust along Z-axis
    }

    uvAttribute.needsUpdate = true;
    return clonedGeometry;
  }, [geometry, scale.z, scaleFactor]);
}
