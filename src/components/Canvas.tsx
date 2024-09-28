import { Canvas, CanvasProps } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ReactNode } from "react";

interface CanvasContainerProps extends CanvasProps {
  children: ReactNode;
}

function CanvasContainer({ children, ...rest }: CanvasContainerProps) {
  return (
    <Canvas
      gl={{ antialias: true }}
      shadows={true}
      camera={{ position: [7, 6, 8], fov: 60, near: 0.1, far: 800 }}
      {...rest}
    >
      {children}
      <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} />
    </Canvas>
  );
}

export default CanvasContainer;
