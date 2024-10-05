import { useRef } from "react";
import { Instances, Instance } from "@react-three/drei";
import { InstancedMesh, BufferGeometry, Material } from "three";
import { BalkInstance } from "./BuildingGroup";

interface VerticalBalksProps {
  balks: BalkInstance[];
  geometry?: BufferGeometry;
  material?: Material | Material[];
  limit: number;
}

export function VerticalBalks({
  balks,
  geometry,
  material,
  limit,
}: VerticalBalksProps) {
  const balkRef = useRef<InstancedMesh>(null);

  return (
    <Instances
      geometry={geometry}
      material={material}
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
