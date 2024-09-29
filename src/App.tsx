import GroundPlane from "./components/GroundPlane";
import CanvasContainer from "./components/CanvasContainer";
import Skybox from "./components/Skybox";
import { InstancedBalks } from "./components/InstancedBalks";
import Lighting from "./components/Lighting";
import AsideControls from "./components/AsideControls";
import { DimensionsProvider } from "./context/DimensionsContext/DimensionsProvider";
import { AssetsProvider } from "./context/AssetsContext/AssetsProvider";

function App() {
  return (
    <DimensionsProvider>
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <AsideControls />
        <CanvasContainer>
          <Skybox />
          <Lighting />
          <GroundPlane />
          <AssetsProvider>
            <InstancedBalks />
          </AssetsProvider>
          <axesHelper args={[5]} />
        </CanvasContainer>
      </div>
    </DimensionsProvider>
  );
}

export default App;
