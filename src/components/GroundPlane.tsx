import { Box } from "@react-three/drei";
import { DoubleSide, Vector3 } from "three";
import { useDimensionsStore } from "../store/dimensionsStore";

function GroundPlane() {
  const { width, depth } = useDimensionsStore();
  const thickness = 0.1;

  return (
    <Box
      position={[0, -thickness * 0.5, 0]}
      args={[width, thickness, depth]}
      receiveShadow
      scale={new Vector3(1, 1, 1)}
    >
      <meshStandardMaterial
        attach="material"
        color="lightgrey"
        metalness={0.0}
        roughness={0.0}
        side={DoubleSide}
      />
    </Box>
  );
}

export default GroundPlane;
