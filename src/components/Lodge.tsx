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

function Lodge({
  index,
  position,
  rotation,
  scale,
  geometry,
  material,
}: LodgeProps) {
  const adjustedGeometry = useUvAdjustedGeometry({
    geometry,
    scale,
    offset: Math.random() * index * Math.random(),
  });

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
