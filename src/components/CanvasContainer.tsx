import { Canvas, CanvasProps } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ReactNode } from "react";
import { Perf } from "r3f-perf";

interface CanvasContainerProps extends CanvasProps {
  children: ReactNode;
}

function CanvasContainer({ children, ...rest }: CanvasContainerProps) {
  return (
    <Canvas
      gl={{ antialias: true, pixelRatio: 2.0 }}
      shadows={true}
      camera={{ position: [7, 6, 8], fov: 60, near: 0.1, far: 1000 }}
      {...rest}
    >
      {children}
      <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} />
      <Perf position="top-right" />
    </Canvas>
  );
}

export default CanvasContainer;
