import { useMemo, useRef } from "react";
import { InstancedMesh } from "three";
import { useModels } from "../hooks/useModels";
import { useBalksContext } from "../hooks/useBalksContext";
import { Instance, Instances } from "@react-three/drei";
import { createBalksAndCorners } from "../utils/createBalks";

export function InstancedBalks() {
  const { balkGeometry, cornerGeometry, material } = useModels();
  const balkRef = useRef<InstancedMesh>(null);
  const cornerRef = useRef<InstancedMesh>(null);

  const { config } = useBalksContext();
  // const adjustedBalks = useAdjustedInstances(balks, config);
  const { balks, corners } = useMemo(() => {
    return createBalksAndCorners(config.width, config.depth, 4, 4);
  }, [config.depth, config.width]);
  return (
    <group>
      <Instances
        geometry={balkGeometry}
        material={material}
        limit={200}
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
        limit={200}
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
