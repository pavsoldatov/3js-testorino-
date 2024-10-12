import { useMemo, useEffect } from "react";
import { BufferGeometry } from "three";

interface UvAdjustedGeometryProps {
  geometry?: BufferGeometry;
  scaleU?: number;
  scaleV?: number;
  offsetU?: number;
  offsetV?: number;
  scaleFactor?: number;
  stretchU?: number;
  stretchV?: number;
  rotationUV?: number;
}

export function useUvAdjustedGeometry({
  geometry,
  scaleU = 1,
  scaleV = 1,
  offsetU = 0,
  offsetV = 0,
  scaleFactor = 1,
  stretchU = 1,
  stretchV = 1,
  rotationUV = 0,
}: UvAdjustedGeometryProps) {
  const adjustedGeometry = useMemo(() => {
    if (!geometry) return undefined;

    const clonedGeometry = geometry.clone();
    const uvAttribute = clonedGeometry.attributes.uv;
    const uvs = uvAttribute.array;

    const cosTheta = Math.cos(rotationUV);
    const sinTheta = Math.sin(rotationUV);

    for (let i = 0; i < uvs.length; i += 2) {
      const u = uvs[i];
      const v = uvs[i + 1];

      // Place the UVs origin at the center (0.5, 0.5)
      const centeredU = u - 0.5;
      const centeredV = v - 0.5;

      // Apply UV rotation
      const rotatedU = centeredU * cosTheta - centeredV * sinTheta;
      const rotatedV = centeredU * sinTheta + centeredV * cosTheta;

      // Apply stretching
      const stretchedU = rotatedU * stretchU;
      const stretchedV = rotatedV * stretchV;

      // Apply scaling from the center
      const scaledU = stretchedU * scaleU * scaleFactor;
      const scaledV = stretchedV * scaleV * scaleFactor;

      // Shift back to UV space and apply offset
      uvs[i] = scaledU + 0.5 + offsetU;
      uvs[i + 1] = scaledV + 0.5 + offsetV;

      // uvs[i] = scaledU + offsetU;
      // uvs[i + 1] = scaledV + offsetV;
    }

    uvAttribute.needsUpdate = true;
    return clonedGeometry;
  }, [
    geometry,
    scaleU,
    scaleV,
    offsetU,
    offsetV,
    scaleFactor,
    stretchU,
    stretchV,
    rotationUV,
  ]);

  useEffect(() => {
    return () => {
      if (adjustedGeometry) adjustedGeometry.dispose();
    };
  }, [adjustedGeometry]);

  return adjustedGeometry;
}
