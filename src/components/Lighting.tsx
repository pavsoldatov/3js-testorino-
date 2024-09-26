import { useMemo } from "react";
import { DirectionalLight } from "three";

function Lighting() {
  const directionalLight = useMemo(() => {
    const light = new DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    return light;
  }, []);

  return <primitive object={directionalLight} />;
}

export default Lighting;
