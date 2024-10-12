import { useMemo, useRef } from "react";
import { Instance, Instances } from "@react-three/drei";
import { BufferGeometry, InstancedMesh, Material, Vector3 } from "three";
import { createUnderlayLodges } from "../utils/createUnderlayLodges";

interface RoofUnderlayLodgesProps {
  width: number;
  depth: number;
  geometry?: BufferGeometry;
  material?: Material;
}

export function RoofUnderlayLodges({
  width,
  depth,
  geometry,
  material,
}: RoofUnderlayLodgesProps) {
  const underlayLodgeRef = useRef<InstancedMesh>(null);
  const underlayLodges = useMemo(() => {
    return createUnderlayLodges(width, depth);
  }, [depth, width]);

  return (
    <group>
      <Instances
        geometry={geometry}
        material={material}
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
        material={material}
      />
      <mesh
        position={new Vector3(0, 2.2 + 0.15 * 0.5 + 0.15, depth * 0.5)}
        scale={new Vector3(width - 0.15 + 0.16 * 2 + 0.15, 1, 1)}
        geometry={geometry}
        material={material}
      />
    </group>
  );
}
