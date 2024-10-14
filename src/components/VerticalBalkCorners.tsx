import { useRef } from "react";
import { Instances, Instance } from "@react-three/drei";
import { InstancedMesh, BufferGeometry } from "three";
import { CornerInstance } from "./CanopyGroup";
import { Woods } from "../context/AssetsContext/AssetsContext";
import { useMaterialStore } from "../store/materialStore";

interface HorizontalBalkCornersProps {
  corners: CornerInstance[];
  geometry?: BufferGeometry;
  materials?: Woods;
  limit: number;
}

export function VerticalBalkCorners({
  corners,
  geometry,
  materials,
  limit,
}: HorizontalBalkCornersProps) {
  const cornerRef = useRef<InstancedMesh>(null);
  const key = useMaterialStore((state) => state.selectedWoodMaterialKey);
  const selectedMaterial = materials?.[key];

  return (
    <Instances
      geometry={geometry}
      material={selectedMaterial}
      limit={limit}
      ref={cornerRef}
      frustumCulled={false}
    >
      {corners.map((corner, index) => (
        <Instance
          key={index}
          position={corner.position}
          rotation={corner.rotation}
        />
      ))}
    </Instances>
  );
}
