import { forwardRef } from "react";
import { Vector3, Euler, BufferGeometry, Material, Mesh } from "three";
interface RoofEdgeProps {
  geometry?: BufferGeometry;
  material?: Material;
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
}

const RoofEdge = forwardRef<Mesh, RoofEdgeProps>(
  ({ geometry, material, position, rotation, scale }, ref) => {
    return (
      <mesh
        ref={ref}
        position={position}
        rotation={rotation}
        geometry={geometry}
        material={material}
        scale={scale}
      />
    );
  }
);

export default RoofEdge;
