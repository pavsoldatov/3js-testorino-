import { Plane } from "@react-three/drei";

function GroundPlane() {
  return (
    <Plane
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      args={[100, 100]}
      receiveShadow
    >
      <meshStandardMaterial
        attach="material"
        color="lightgrey"
        metalness={0.0}
        roughness={0.0}
      />
    </Plane>
  );
}

export default GroundPlane;
