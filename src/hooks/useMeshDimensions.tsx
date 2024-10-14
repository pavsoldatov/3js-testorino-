import { useEffect, useState } from "react";
import { Box3, Vector3, Mesh } from "three";

export function useMeshDimensions(meshRef: React.RefObject<Mesh | null>): Vector3 | null {
  const [dimensions, setDimensions] = useState<Vector3 | null>(null);

  useEffect(() => {
    if (meshRef.current) {
      // Create a Box3 to calculate the bounding box of the mesh
      const boundingBox = new Box3().setFromObject(meshRef.current);

      // Get the size of the bounding box
      const size = new Vector3();
      boundingBox.getSize(size);

      // Update state with the dimensions
      setDimensions(size);
    }
  }, [meshRef]);

  return dimensions;
}
