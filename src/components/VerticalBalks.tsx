import { useRef } from "react";
import { Instances, Instance } from "@react-three/drei";
import { InstancedMesh, BufferGeometry } from "three";
import { BalkInstance } from "./CanopyGroup";
import { Woods } from "../context/AssetsContext/AssetsContext";
import { useMaterialStore } from "../store/materialStore";

interface VerticalBalksProps {
  balks: BalkInstance[];
  geometry?: BufferGeometry;
  materials?: Woods;
  limit: number;
}

export function VerticalBalks({
  balks,
  geometry,
  materials,
  limit,
}: VerticalBalksProps) {
  const balkRef = useRef<InstancedMesh>(null);
  const key = useMaterialStore((state) => state.selectedWoodMaterialKey);
  const selectedMaterial = materials?.[key];

  return (
    <Instances
      geometry={geometry}
      material={selectedMaterial}
      limit={limit}
      ref={balkRef}
      frustumCulled={false}
    >
      {balks.map((balk, index) => (
        <Instance
          key={index}
          position={balk.position}
          rotation={balk.rotation}
        />
      ))}
    </Instances>
  );
}
