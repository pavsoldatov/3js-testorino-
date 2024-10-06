import { useMemo, useRef } from "react";
import { BufferGeometry, InstancedMesh, Material, Vector3 } from "three";
import { createUnderlayLodges } from "../utils/createUnderlayLodges";
import { Instance, Instances } from "@react-three/drei";
import { useUvAdjustedGeometryX } from "../hooks/useUvAdjustedGeometryX";
import { useUvAdjustedGeometryZ } from "../hooks/useUvAdjustedGeometryZ";

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
  const underlayLodges = useMemo(() => {
    return createUnderlayLodges(width, depth);
  }, [depth, width]);

  const underlayLodgeRef = useRef<InstancedMesh>(null);

  const xAdjustedGeometry = useUvAdjustedGeometryX({
    geometry,
    scale: new Vector3(width, 1, 1),
  });

  const zAdjustedGeometry = useUvAdjustedGeometryZ({
    geometry,
    scale: new Vector3(1, 1, depth),
  });

  return (
    <group>
      <Instances
        geometry={zAdjustedGeometry}
        material={material}
        limit={41}
        ref={underlayLodgeRef}
        frustumCulled={true}
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
        geometry={xAdjustedGeometry}
        material={material}
      />
      <mesh
        position={new Vector3(0, 2.2 + 0.15 * 0.5 + 0.15, depth * 0.5)}
        scale={new Vector3(width - 0.15 + 0.16 * 2 + 0.15, 1, 1)}
        geometry={xAdjustedGeometry}
        material={material}
      />
    </group>
  );
}
