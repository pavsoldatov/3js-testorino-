// RoofUnderlays.tsx
import { useMemo, useRef } from "react";
import { BufferGeometry, InstancedMesh, Material } from "three";
import {
  RoofUnderlayInstance,
  createRoofUnderlays,
} from "../utils/createRoofUnderlays";
import { Instance, Instances } from "@react-three/drei";

interface RoofUnderlaysProps {
  width: number;
  depth: number;
  geometryWidth?: number;
  heightOffset?: number;
  geometry?: BufferGeometry;
  material?: Material;
}

const RoofUnderlays = ({
  width,
  depth,
  geometryWidth = 0.19,
  heightOffset = 0.1,
  geometry,
  material,
}: RoofUnderlaysProps) => {
  const underlayRef = useRef<InstancedMesh>(null);
  const underlays: RoofUnderlayInstance[] = useMemo(
    () => createRoofUnderlays(width, depth, geometryWidth, heightOffset),
    [width, depth, geometryWidth, heightOffset]
  );
  const limit = 110; // underlays length

  return (
    <Instances
      geometry={geometry}
      material={material}
      ref={underlayRef}
      limit={limit}
      frustumCulled={false}
    >
      {underlays.map((underlay, index) => (
        <Instance
          key={index}
          position={underlay.position}
          rotation={underlay.rotation}
          scale={underlay.scale}
        />
      ))}
    </Instances>
  );
};

export default RoofUnderlays;
