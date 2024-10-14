import { useMemo, useRef } from "react";
import { Instance, Instances } from "@react-three/drei";
import { BufferGeometry, InstancedMesh, Vector3 } from "three";
import { createUnderlayLodges } from "../utils/createUnderlayLodges";
import { Woods } from "../context/AssetsContext/AssetsContext";
import { useMaterialStore } from "../store/materialStore";

interface RoofUnderlayLodgesProps {
  width: number;
  depth: number;
  geometry?: BufferGeometry;
  materials?: Woods;
}

export function RoofUnderlayLodges({
  width,
  depth,
  geometry,
  materials,
}: RoofUnderlayLodgesProps) {
  const underlayLodgeRef = useRef<InstancedMesh>(null);
  const underlayLodges = useMemo(
    () => createUnderlayLodges(width, depth),
    [depth, width]
  );
  const key = useMaterialStore((state) => state.selectedWoodMaterialKey);
  const selectedMaterial = materials?.[key];

  return (
    <group>
      <Instances
        geometry={geometry}
        material={selectedMaterial}
        limit={41}
        ref={underlayLodgeRef}
        frustumCulled={false}
      >
        {underlayLodges.map((lodge, index) => (
          <Instance
            key={index}
            position={lodge.position}
            rotation={lodge.rotation}
            scale={lodge.scale}
          />
        ))}
      </Instances>
      <mesh
        position={new Vector3(0, 2.2 + 0.15 * 0.5 + 0.15, depth * -0.5)}
        scale={new Vector3(width - 0.15 + 0.16 * 2 + 0.15, 1, 1)}
        geometry={geometry}
        material={selectedMaterial}
      />
      <mesh
        position={new Vector3(0, 2.2 + 0.15 * 0.5 + 0.15, depth * 0.5)}
        scale={new Vector3(width - 0.15 + 0.16 * 2 + 0.15, 1, 1)}
        geometry={geometry}
        material={selectedMaterial}
      />
    </group>
  );
}
