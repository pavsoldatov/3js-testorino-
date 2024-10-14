import { BufferGeometry } from "three";
import { createRoofUnderlaySideLodges } from "../utils/createRoofUnderlaySideLodges";
import { useMemo } from "react";
import { Instance, Instances } from "@react-three/drei";
import { Woods } from "../context/AssetsContext/AssetsContext";
import { useMaterialStore } from "../store/materialStore";

interface RoofUnderlaySideLodgesProps {
  width: number;
  depth: number;
  materials?: Woods;
  geometry?: BufferGeometry;
}

export function RoofUnderlaySideLodges({
  width,
  depth,
  materials,
  geometry,
}: RoofUnderlaySideLodgesProps) {
  const roofUnderlaySideLodges = useMemo(
    () => createRoofUnderlaySideLodges(width, depth),
    [depth, width]
  );
  const key = useMaterialStore((state) => state.selectedWoodMaterialKey);
  const selectedMaterial = materials?.[key];

  return (
    <Instances
      geometry={geometry}
      material={selectedMaterial}
      limit={100}
      frustumCulled={false}
    >
      {roofUnderlaySideLodges.map((lodge, index) => (
        <Instance key={index} position={lodge.position} scale={lodge.scale} />
      ))}
    </Instances>
  );
}
