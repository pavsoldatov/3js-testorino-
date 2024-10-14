import { BufferGeometry, Euler, Material, Mesh, Vector3 } from "three";
import { forwardRef } from "react";

interface RoofEdgeCornerProps {
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  geometry?: BufferGeometry;
  material?: Material;
}

export const RoofEdgeCorner = forwardRef<Mesh, RoofEdgeCornerProps>(
  ({ geometry, material, position, rotation, scale }, ref) => {
    return (
      <mesh
        ref={ref}
        geometry={geometry}
        material={material}
        position={position}
        scale={scale}
        rotation={rotation}
      />
    );
  }
);
