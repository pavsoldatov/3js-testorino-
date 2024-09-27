import { useMemo } from "react";
import { TextureLoader, Mesh, MeshStandardMaterial } from "three";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import balkCornerFile from "../assets/models/balk_corner.obj?url";
import balkTexture from "../assets/textures/texture_wood.jpg?url";
import balkNormalMap from "../assets/textures/texture_wood_normal.jpg?url";

export function useBalkCorner() {
  const balkCorner = useLoader(OBJLoader, balkCornerFile);
  const texture = useLoader(TextureLoader, balkTexture);
  const normalMap = useLoader(TextureLoader, balkNormalMap);

  useMemo(() => {
    balkCorner.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = new MeshStandardMaterial({
          map: texture,
          normalMap: normalMap,
        });
      }
    });
  }, [balkCorner, texture, normalMap]);

  return balkCorner.clone();
}
