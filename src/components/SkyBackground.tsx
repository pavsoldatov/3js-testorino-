import { Sky } from "@react-three/drei";

function SkyBackground() {
  return (
    <Sky
      distance={450000}
      sunPosition={[5, 1, 8]}
      inclination={0.6}
      azimuth={0.25}
    />
  );
}

export default SkyBackground;
