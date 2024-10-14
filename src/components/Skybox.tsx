import { Environment } from "@react-three/drei";

// import file from "../assets/skybox/venetian_crossroads_1k.hdr?url";

function Skybox() {
  return (
    <>
      <Environment
        preset="sunset"
        environmentIntensity={0.9}
        background
        backgroundBlurriness={1}
      />
    </>
  );
}

export default Skybox;
