import { Environment } from "@react-three/drei";

import file from "../assets/skybox/venetian_crossroads_1k.hdr?url";

function Skybox() {
  return (
    <Environment
      backgroundBlurriness={1}
      environmentIntensity={0.7}
      backgroundIntensity={1}
      background
      files={file}
    />
  );
}

export default Skybox;
