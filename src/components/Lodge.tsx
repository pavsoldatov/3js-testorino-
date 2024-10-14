import { BufferGeometry, Euler, Material, Vector3 } from "three";
import { useUvAdjustedGeometry } from "../hooks/useUvAdjustedGeometry";

interface LodgeProps {
  index: number;
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  geometry?: BufferGeometry;
  material?: Material;
}

function Lodge({ position, rotation, scale, geometry, material }: LodgeProps) {
  const adjustedGeometry = useUvAdjustedGeometry({geometry, scaleU: scale.x, stretchU: 0.3});

  return (
    <mesh
      position={position}
      rotation={rotation}
      geometry={adjustedGeometry}
      material={material}
      scale={scale}
    />
  );
}

export default Lodge;
