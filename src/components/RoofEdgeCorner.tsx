import {
  BufferGeometry,
  Euler,
  Material,
  Mesh,
  MeshPhysicalMaterial,
  Vector3,
} from "three";
import { useEffect, useMemo, useRef } from "react";

interface RoofEdgeCornerProps {
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  geometry?: BufferGeometry;
  material?: Material;
}

export const RoofEdgeCorner = ({
  position,
  rotation,
  scale,
  geometry,
  material,
}: RoofEdgeCornerProps) => {
  const meshRef = useRef<Mesh>(null);

  const mat = useMemo(() => {
    return material?.clone() as MeshPhysicalMaterial;
  }, [material]);

  useEffect(() => {
    mat.normalMap = null;
    mat.needsUpdate = true;

    return () => {
      if (mat) mat.dispose();
    };
  }, [mat]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={mat}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
};
