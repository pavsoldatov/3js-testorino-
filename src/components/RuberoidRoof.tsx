import { BufferGeometry, Vector3, MeshPhysicalMaterial, Vector2 } from "three";
import { useUvAdjustedGeometry } from "../hooks/useUvAdjustedGeometry";

interface RuberoidRoofProps {
  width: number;
  depth: number;
  geometry?: BufferGeometry;
  material?: MeshPhysicalMaterial;
  overhangOuter: number;
}

export function RuberoidRoof({
  width,
  depth,
  geometry,
  material,
  overhangOuter,
}: RuberoidRoofProps) {
  const scale = new Vector3(
    width + overhangOuter * 2,
    2,
    depth + overhangOuter * 2
  );
  const offset = 0.012; // a weird unspecified offset from the Specs (refer to "9-ruberoid_1000x1000x2" on page 5)
  const position = new Vector3(0, 2.2 + 0.32 + offset, 0);
  const adjustedGeometry = useUvAdjustedGeometry({geometry, scaleU: scale.z, scaleV: scale.x});

  return (
    <mesh
      scale={scale}
      position={position}
      geometry={adjustedGeometry}
      material={material}
    />
  );
}
