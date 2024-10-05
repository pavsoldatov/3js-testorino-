import { useMemo, useRef } from "react";
import { DirectionalLight, DirectionalLightHelper } from "three";
// import { AmbientLight } from "three"
import { useHelper } from "@react-three/drei";

function Lighting() {
  // Create refs for each of the directional lights
  const directionalLightRef1 = useRef<DirectionalLight>(null!);
  const directionalLightRef2 = useRef<DirectionalLight>(null!);
  const directionalLightRef3 = useRef<DirectionalLight>(null!);
  const directionalLightRef4 = useRef<DirectionalLight>(null!);

  // Create 4 directional lights, each pointing to (0, 0, 0) with a warm hue
  const directionalLight1 = useMemo(() => {
    const light = new DirectionalLight(0xffddaa, 0.5); // Slightly warmer light
    light.position.set(10, 8, 10); // Light from top-right
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    return light;
  }, []);

  const directionalLight2 = useMemo(() => {
    const light = new DirectionalLight(0xffddaa, 1); // top-left
    light.position.set(-10, 8, -10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    return light;
  }, []);

  const directionalLight3 = useMemo(() => {
    const light = new DirectionalLight(0xffddaa, 0.5); // bottom-right
    light.position.set(10, 5, -10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    return light;
  }, []);

  const directionalLight4 = useMemo(() => {
    const light = new DirectionalLight(0xffddaa, 0.75); // bottom-left
    light.position.set(-10, 5, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    return light;
  }, []);

  // const ambientLight = useMemo(() => {
  //   return new AmbientLight(0xfff4e0, 0.2);
  // }, []);

  useHelper(directionalLightRef1, DirectionalLightHelper, 1);
  useHelper(directionalLightRef2, DirectionalLightHelper, 1);
  useHelper(directionalLightRef3, DirectionalLightHelper, 1);
  useHelper(directionalLightRef4, DirectionalLightHelper, 1);

  return (
    <>
      <primitive object={directionalLight1} ref={directionalLightRef1} />
      <primitive object={directionalLight2} ref={directionalLightRef2} />
      <primitive object={directionalLight3} ref={directionalLightRef3} />
      <primitive object={directionalLight4} ref={directionalLightRef4} />
      {/* <primitive object={ambientLight} /> */}

      {/* <axesHelper args={[5]} /> */}
    </>
  );
}

export default Lighting;
