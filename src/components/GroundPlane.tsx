import { Plane } from "@react-three/drei";

function GroundPlane() {
  return (
    <Plane
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      args={[100, 100]}
      receiveShadow
    >
      <meshStandardMaterial attach="material" color="lightgrey" />
    </Plane>
  );
}

export default GroundPlane;
