import { useEffect, useRef } from "react";
import { Box3, BufferGeometry, Euler, Material, Mesh, Vector3 } from "three";

interface MeshInspectorProps {
  geometry?: BufferGeometry;
  material?: Material;
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
}

export function MeshInspector({ material, geometry, position, scale, rotation }: MeshInspectorProps) {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      // Create a Box3 to calculate the bounding box of the mesh
      const boundingBox = new Box3().setFromObject(meshRef.current);

      // Get the size of the bounding box
      const size = new Vector3();
      boundingBox.getSize(size);

      console.log("Bounding Box Size (Intrinsic Dimensions): ", size);
    }
  }, [geometry, material, position, scale]);

  return (
    <mesh
      ref={meshRef}
      material={material}
      geometry={geometry}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}
