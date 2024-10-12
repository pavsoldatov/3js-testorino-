import { BufferGeometry, Euler, Material, Vector3 } from "three";
import { useUvAdjustedGeometry } from "../hooks/useUvAdjustedGeometry";

interface HorizontalBalkProps {
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  geometry?: BufferGeometry;
  material?: Material | Material[];
}

function HorizontalBalk({
  position,
  rotation,
  scale,
  geometry,
  material,
}: HorizontalBalkProps) {
  const adjustedGeometry = useUvAdjustedGeometry({geometry, scaleU: scale.x, stretchU: 0.4});

  return (
    <mesh
      position={position}
      rotation={rotation}
      geometry={adjustedGeometry}
      material={material}
      scale={scale}
      frustumCulled={true}
    />
  );
}

export default HorizontalBalk;
