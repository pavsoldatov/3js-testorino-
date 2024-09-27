import GroundPlane from "./components/GroundPlane";
import CanvasContainer from "./components/Canvas";
import Skybox from "./components/Skybox";
import BalkWithCorner from "./components/BalkWithCorner";

function App() {
  return (
    <CanvasContainer>
      <Skybox />
      <GroundPlane />
      <BalkWithCorner directions={["n", "s"]} />
      <axesHelper args={[5]} />;
    </CanvasContainer>
  );
}

export default App;
