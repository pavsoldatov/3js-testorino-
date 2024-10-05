import React from "react";
import { Instances, Instance } from "@react-three/drei";
import { InstancedMesh, BufferGeometry, Material } from "three";
import { CornerInstance } from "./BuildingGroup";

interface HorizontalBalkCornersProps {
  corners: CornerInstance[];
  geometry?: BufferGeometry;
  material?: Material | Material[];
  limit: number;
}

export function VerticalBalkCorners({
  corners,
  geometry,
  material,
  limit,
}: HorizontalBalkCornersProps) {
  const cornerRef = React.useRef<InstancedMesh>(null);

  return (
    <Instances
      geometry={geometry}
      material={material}
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
