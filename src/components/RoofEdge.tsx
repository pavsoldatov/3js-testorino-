import { Vector3, Euler, BufferGeometry, Material } from "three";
import { useUvAdjustedGeometry } from "../hooks/useUvAdjustedGeometry";

interface RoofEdgeProps {
  geometry?: BufferGeometry;
  material?: Material;
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  scaleU: number;
  mirroredUv: boolean;
  offsetU: number;
  scaleFactor: number;
}

function RoofEdge({
  geometry,
  material,
  position,
  rotation,
  scale,
  scaleU,
  mirroredUv,
  offsetU,
  scaleFactor,
}: RoofEdgeProps) {
  const adjustedGeometry = useUvAdjustedGeometry({
    geometry,
    scaleU: mirroredUv ? -scaleU : scaleU,
    offsetU,
    scaleFactor,
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

export default RoofEdge;
