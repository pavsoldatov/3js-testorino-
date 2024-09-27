import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { TextureLoader, Mesh, MeshStandardMaterial } from "three";

import balkFile from "../assets/models/balk_150x150x2200.obj?url";
import balkTexture from "../assets/textures/texture_wood.jpg?url";
import balkNormalMap from "../assets/textures/texture_wood_normal.jpg?url";

export function useBalk() {
  const balk = useLoader(OBJLoader, balkFile);
  const texture = useLoader(TextureLoader, balkTexture);
  const normalMap = useLoader(TextureLoader, balkNormalMap);

  useMemo(() => {
    balk.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = new MeshStandardMaterial({
          map: texture,
          normalMap: normalMap,
        });
      }
    });
  }, [balk, texture, normalMap]);

  return balk.clone();
}
