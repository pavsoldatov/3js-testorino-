// RoofUnderlays.tsx
import { useMemo, useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { BufferGeometry, InstancedMesh } from "three";
import {
  RoofUnderlayInstance,
  createRoofUnderlays,
} from "../utils/createRoofUnderlays";
import { Instance, Instances } from "@react-three/drei";
import { Woods } from "../context/AssetsContext/AssetsContext";
import { useMaterialStore } from "../store/materialStore";

interface RoofUnderlaysProps {
  width: number;
  depth: number;
  geometryWidth?: number;
  heightOffset?: number;
  geometry?: BufferGeometry;
  materials?: Woods;
}

const RoofUnderlays = ({
  width,
  depth,
  geometryWidth = 0.19,
  heightOffset = 0.1,
  geometry,
  materials,
}: RoofUnderlaysProps) => {
  const underlayRef = useRef<InstancedMesh>(null);
  const { camera } = useThree();
  const [visible, setVisible] = useState(false);

  const underlays: RoofUnderlayInstance[] = useMemo(
    () => createRoofUnderlays(width, depth, geometryWidth, heightOffset),
    [width, depth, geometryWidth, heightOffset]
  );
  const key = useMaterialStore((state) => state.selectedWoodMaterialKey);
  const selectedMaterial = materials?.[key];

  const limit = 110; // underlays length

  useFrame(() => {
    const newVisible = camera.position.y <= 2.55;
    if (newVisible !== visible) {
      setVisible(newVisible);
    }
  });

  return (
    <Instances
      geometry={geometry}
      material={selectedMaterial}
      ref={underlayRef}
      limit={limit}
      frustumCulled={true}
      visible={visible}
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
