import GroundPlane from "./components/GroundPlane";
import CanvasContainer from "./components/CanvasContainer";
import Skybox from "./components/Skybox";
import { BuildingGroup } from "./components/BuildingGroup";
import Lighting from "./components/Lighting";
import AsideControls from "./components/AsideControls";
import { DimensionsProvider } from "./context/DimensionsContext/DimensionsProvider";
import { AssetsProvider } from "./context/AssetsContext/AssetsProvider";
import { Suspense } from "react";

function App() {
  return (
    <DimensionsProvider>
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <AsideControls />
        <CanvasContainer>
          <Skybox />
          {/* <Lighting /> */}
          <GroundPlane />
          <Suspense>
            <AssetsProvider>
              <BuildingGroup />
            </AssetsProvider>
          </Suspense>
          <axesHelper args={[5]} />
        </CanvasContainer>
      </div>
    </DimensionsProvider>
  );
}

export default App;
