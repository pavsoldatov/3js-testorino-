import { BufferGeometry, Material, Vector3 } from "three";
import { createRoofUnderlaySideLodges } from "../utils/createRoofUnderlaySideLodges";
import { useMemo } from "react";
import { Instance, Instances } from "@react-three/drei";

interface RoofUnderlaySideLodgesProps {
  width: number;
  depth: number;
  material?: Material;
  geometry?: BufferGeometry;
}

export function RoofUnderlaySideLodges({
  width,
  depth,
  material,
  geometry,
}: RoofUnderlaySideLodgesProps) {
  const roofUnderlaySideLodges = useMemo(
    () => createRoofUnderlaySideLodges(width, depth),
    [depth, width]
  );

  return (
    <Instances
      geometry={geometry}
      material={material}
      limit={100}
      frustumCulled={false}
    >
      {roofUnderlaySideLodges.map((lodge, index) => (
        <Instance key={index} position={lodge.position} scale={lodge.scale} />
      ))}
    </Instances>
  );
}
