import { useMemo, useRef } from "react";
import { Euler, InstancedMesh, Vector3 } from "three";
import { Instance, Instances } from "@react-three/drei";
import { useDimensions } from "../hooks/useDimensions";
import { useAssets } from "../hooks/useAssets";
import { createBalksAndCorners } from "../utils/createBalksAndCorners";
import { BUFFERED_BALKS_LIMIT, BUFFERED_CORNERS_LIMIT } from "../constants";

export interface BalkInstance {
  position: Vector3;
  rotation: Euler;
}

export type CornerInstance = BalkInstance;

export function InstancedBalks() {
  const { balkGeometry, cornerGeometry, material } = useAssets();

  const balkRef = useRef<InstancedMesh>(null);
  const cornerRef = useRef<InstancedMesh>(null);

  const { config } = useDimensions();
  const { balks, corners } = useMemo(
    () => createBalksAndCorners(config.width, config.depth, 4),
    [config.depth, config.width]
  );

  return (
    <group>
      <Instances
        geometry={balkGeometry}
        material={material}
        limit={BUFFERED_BALKS_LIMIT}
        ref={balkRef}
      >
        {balks.map((balk, index) => (
          <Instance
            key={index}
            position={balk.position}
            rotation={balk.rotation}
          />
        ))}
      </Instances>
      <Instances
        geometry={cornerGeometry}
        material={material}
        limit={BUFFERED_CORNERS_LIMIT}
        ref={cornerRef}
      >
        {corners.map((corner, index) => (
          <Instance
            key={index}
            position={corner.position}
            rotation={corner.rotation}
          />
        ))}
      </Instances>
    </group>
  );
}
