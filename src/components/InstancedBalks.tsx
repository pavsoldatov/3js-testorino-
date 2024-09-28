import { useRef } from "react";
import { InstancedMesh } from "three";
import { useModels } from "../hooks/useModels";
import { useBalksContext } from "../hooks/useBalksContext";
import { useAdjustedInstances } from "../hooks/useAdjustedInstances";
import { BalkInstance } from "../types";
import { Instance, Instances } from "@react-three/drei";

interface InstancedBalksProps {
  balks: BalkInstance[];
  corners: BalkInstance[];
}

export function InstancedBalks({ balks, corners }: InstancedBalksProps) {
  const { balkGeometry, cornerGeometry, material } = useModels();
  const balkRef = useRef<InstancedMesh>(null);
  const cornerRef = useRef<InstancedMesh>(null);
  
  const { config } = useBalksContext();
  const adjustedBalks = useAdjustedInstances(balks, config);
  const adjustedCorners = useAdjustedInstances(corners, config);

  return (
    <group>
      <Instances
        geometry={balkGeometry}
        material={material}
        limit={200}
        ref={balkRef}
      >
        {adjustedBalks.map((balk, index) => (
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
        {adjustedCorners.map((corner, index) => (
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
