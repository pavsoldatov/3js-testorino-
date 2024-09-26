import Balk from "./Balk";
import GroundPlane from "./components/GroundPlane";
import CanvasContainer from "./components/Canvas";
import { Suspense } from "react";
import Skybox from "./components/Skybox";

function App() {
  return (
    <CanvasContainer>
      <Suspense fallback={null}>
        <Skybox />
        <GroundPlane />
        <Balk />
      </Suspense>
      <axesHelper args={[5]} />;
    </CanvasContainer>
  );
}

export default App;