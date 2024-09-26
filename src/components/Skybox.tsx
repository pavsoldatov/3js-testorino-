import { Environment } from "@react-three/drei";

import exrSrc from "../assets/skybox/venetian_crossroads_1k.exr?url";

function Skybox() {
  return (
    <Environment
      backgroundBlurriness={1}
      environmentIntensity={0.4}
      backgroundIntensity={0.5}
      background
      files={exrSrc}
    />
  );
}

export default Skybox;
