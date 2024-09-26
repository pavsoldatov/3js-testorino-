import { Canvas, CanvasProps } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ReactNode } from "react";

interface CanvasContainerProps extends CanvasProps {
  children: ReactNode;
}

function CanvasContainer({ children, ...rest }: CanvasContainerProps) {
  return (
    <Canvas
      shadows={true}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      camera={{ position: [5, 4, 5], fov: 60, near: 0.1, far: 1000 }}
      {...rest}
    >
      {children}
      <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} />
    </Canvas>
  );
}

export default CanvasContainer;
