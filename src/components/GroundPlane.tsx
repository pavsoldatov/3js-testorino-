import { Box } from "@react-three/drei";
import { useDimensions } from "../hooks/useDimensions";
import { DoubleSide, Vector3 } from "three";

function GroundPlane() {
  const { dimensions } = useDimensions();
  const thickness = 0.1;
  console.log(dimensions)
  return (
    <Box
      position={[0, -thickness * 0.5, 0]}
      args={[
        dimensions.width,
        thickness,
        dimensions.depth,
      ]}
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
