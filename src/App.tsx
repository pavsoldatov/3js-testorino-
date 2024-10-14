import GroundPlane from "./components/GroundPlane";
import CanvasContainer from "./components/CanvasContainer";
import Skybox from "./components/Skybox";
import { CanopyGroup } from "./components/CanopyGroup";
import AsideControls from "./components/AsideControls";
import { AssetsProvider } from "./context/AssetsContext/AssetsProvider";
import { Suspense } from "react";
import { AsideControlsGui } from "./components/AsideControlsGui";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
        }}
      >
        <AsideControls />
        <CanvasContainer>
          <Skybox />
          <GroundPlane />
          <Suspense>
            <AssetsProvider>
              <CanopyGroup />
            </AssetsProvider>
          </Suspense>
          <axesHelper args={[5]} />
        </CanvasContainer>
      </div>
      <AsideControlsGui />
    </>
  );
}

export default App;
