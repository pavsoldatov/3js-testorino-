import { ReactNode, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { useGLTF } from "@react-three/drei";
import {
  TextureLoader,
  Mesh,
  SRGBColorSpace,
  RepeatWrapping,
  MeshPhysicalMaterial,
} from "three";
import { AssetsContext } from "./AssetsContext";
import { applyWoodShader } from "../../shaders/woodShader";
import { centerGeometry } from "../../utils/centerGeometry";

import verticalBalkSrc from "../../assets/models/balk_150x150x2200.obj?url";
import horizontalBalkSrc from "../../assets/models/balk_150x150x1000.obj?url";
import balkTextureSrc from "../../assets/textures/texture_wood.jpg?url";
import balkNormalMap from "../../assets/textures/texture_wood_normal.jpg?url";
import balkCornerSrc from "../../assets/models/balk_corner.obj?url";
import lodgeSrc from "../../assets/models/Lodge_20x200x1000.obj?url";
import materialsFile from "../../assets/Canopy_Materials.glb?url";
import roofUnderlaySrc from "../../assets/models/Lodge_20x190x1000_bevel.obj?url"

export function AssetsProvider({ children }: { children: ReactNode }) {
  const materialsGltf = useGLTF(materialsFile);

  const balkFile = useLoader(OBJLoader, verticalBalkSrc); // vertical
  const balkCornerFIle = useLoader(OBJLoader, balkCornerSrc); // vertical balk corner
  const horizontalBalkFile = useLoader(OBJLoader, horizontalBalkSrc); // horizontal
  const lodgeFile = useLoader(OBJLoader, lodgeSrc);
  const roofUnderlayFile = useLoader(OBJLoader, roofUnderlaySrc);
  const texture = useLoader(TextureLoader, balkTextureSrc);
  const normalMap = useLoader(TextureLoader, balkNormalMap);

  console.log(materialsGltf.materials);

  const wood1 = useMemo(() => {
    const woodMaterial = materialsGltf.materials["wood.001"];
    return woodMaterial.clone();
  }, [materialsGltf.materials]);

  const wood2 = useMemo(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.wrapS = texture.wrapT = RepeatWrapping;
    normalMap.wrapS = normalMap.wrapT = RepeatWrapping;

    return new MeshPhysicalMaterial({
      map: texture,
      normalMap: normalMap,
      metalness: 0.2,
      roughness: 0.4,
      clearcoat: 0.75, // sheen
      clearcoatRoughness: 0.5,
    });
  }, [texture, normalMap]);

  wood2.onBeforeCompile = applyWoodShader;

  const verticalBalk = useMemo(() => {
    if (balkFile.children[0] instanceof Mesh) {
      return balkFile.children[0].geometry;
    }
    throw new Error("Balk model does not contain a Mesh");
  }, [balkFile]);

  const horizontalBalk = useMemo(() => {
    if (horizontalBalkFile.children[0] instanceof Mesh) {
      return centerGeometry(horizontalBalkFile.children[0].geometry);
    }
    throw new Error("Balk model does not contain a Mesh");
  }, [horizontalBalkFile]);

  const verticalBalkCorner = useMemo(() => {
    if (balkCornerFIle.children[0] instanceof Mesh) {
      return balkCornerFIle.children[0].geometry;
    }
    throw new Error("Corner model does not contain a Mesh");
  }, [balkCornerFIle]);

  const lodge = useMemo(() => {
    if (lodgeFile.children[0] instanceof Mesh) {

      console.log(lodgeFile.children[0].geometry)
      return centerGeometry(lodgeFile.children[0].geometry);
    }
    throw new Error("Corner model does not contain a Mesh");
  }, [lodgeFile]);

  const roofUnderlay = useMemo(() => {
    if (roofUnderlayFile.children[0] instanceof Mesh) {

      console.log(roofUnderlayFile.children[0].geometry)
      return centerGeometry(roofUnderlayFile.children[0].geometry);
    }
    throw new Error("Corner model does not contain a Mesh");
  }, [roofUnderlayFile]);

  return (
    <AssetsContext.Provider
      value={{
        verticalBalk,
        horizontalBalk,
        verticalBalkCorner,
        lodge,
        roofUnderlay,
        wood1,
        wood2,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
}
