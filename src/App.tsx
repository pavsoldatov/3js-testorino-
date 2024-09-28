import GroundPlane from "./components/GroundPlane";
import CanvasContainer from "./components/Canvas";
import Skybox from "./components/Skybox";
import { InstancedBalks } from "./components/InstancedBalks";
import Lighting from "./components/Lighting";
import AsideControls from "./components/AsideControls";
import { balks, corners } from "./components/balkData";
import { BalksProvider } from "./context/BalksContext";

function App() {
  return (
    <BalksProvider>
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <AsideControls />
        <CanvasContainer>
          <Skybox />
          <Lighting />
          <GroundPlane />
          <InstancedBalks balks={balks} corners={corners} />
          <axesHelper args={[5]} />
        </CanvasContainer>
      </div>
    </BalksProvider>
  );
}

export default App;
