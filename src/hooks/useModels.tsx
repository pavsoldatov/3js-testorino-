import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { TextureLoader, Mesh, MeshStandardMaterial } from "three";

import balkFile from "../assets/models/balk_150x150x2200.obj?url";
import balkTexture from "../assets/textures/texture_wood.jpg?url";
import balkNormalMap from "../assets/textures/texture_wood_normal.jpg?url";
import balkCornerFile from "../assets/models/balk_corner.obj?url";

export function useModels() {
  const balk = useLoader(OBJLoader, balkFile);
  const balkCorner = useLoader(OBJLoader, balkCornerFile);
  const texture = useLoader(TextureLoader, balkTexture);
  const normalMap = useLoader(TextureLoader, balkNormalMap);

  const material = useMemo(() => {
    return new MeshStandardMaterial({
      map: texture,
      normalMap: normalMap,
      metalness: 0.8,
      roughness: 0.5,
    });
  }, [texture, normalMap]);

  const balkGeometry = useMemo(() => {
    if (balk.children[0] instanceof Mesh) {
      return balk.children[0].geometry;
    }
    throw new Error("Balk model does not contain a Mesh");
  }, [balk]);

  const cornerGeometry = useMemo(() => {
    if (balkCorner.children[0] instanceof Mesh) {
      return balkCorner.children[0].geometry;
    }
    throw new Error("Corner model does not contain a Mesh");
  }, [balkCorner]);

  return { balkGeometry, cornerGeometry, material };
}
