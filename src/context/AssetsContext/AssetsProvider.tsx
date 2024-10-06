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
import roofUnderlaySrc from "../../assets/models/Lodge_20x190x1000_bevel.obj?url";
import topLodgeSrc from "../../assets/models/lodge_150x50x1000.obj?url";

export function AssetsProvider({ children }: { children: ReactNode }) {
  const materialsGltf = useGLTF(materialsFile);

  const balkFile = useLoader(OBJLoader, verticalBalkSrc); // vertical
  const balkCornerFIle = useLoader(OBJLoader, balkCornerSrc); // vertical balk corner
  const horizontalBalkFile = useLoader(OBJLoader, horizontalBalkSrc); // horizontal
  const lodgeFile = useLoader(OBJLoader, lodgeSrc); // an outer rim around the structure
  const roofUnderlayFile = useLoader(OBJLoader, roofUnderlaySrc); // roof underlay attached to the outer rim
  const topLodgeFile = useLoader(OBJLoader, topLodgeSrc); // lodges underneath the roof overlay placed on top of horizontal balks

  const texture = useLoader(TextureLoader, balkTextureSrc);
  const normalMap = useLoader(TextureLoader, balkNormalMap);

  const wood1 = useMemo(() => {
    const woodMaterial = materialsGltf.materials["wood.001"];
    return woodMaterial.clone();
  }, [materialsGltf.materials]);

  const wood2 = useMemo(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.wrapS = texture.wrapT = RepeatWrapping;
    normalMap.wrapS = normalMap.wrapT = RepeatWrapping;

    const material = new MeshPhysicalMaterial({
      map: texture,
      normalMap: normalMap,
      roughness: 0.25,
      clearcoat: 0.75, // sheen
      clearcoatRoughness: 0.5,
    });
    
    // Reminder: toggle in gui
    material.onBeforeCompile = applyWoodShader;

    return material;
  }, [texture, normalMap]);

  const verticalBalk = useMemo(() => {
    if (balkFile.children[0] instanceof Mesh) {
      return balkFile.children[0].geometry;
    }
    throw new Error("Vertical balk model does not contain a Mesh");
  }, [balkFile]);

  const horizontalBalk = useMemo(() => {
    if (horizontalBalkFile.children[0] instanceof Mesh) {
      return centerGeometry(horizontalBalkFile.children[0].geometry);
    }
    throw new Error("Horizontal balk model does not contain a Mesh");
  }, [horizontalBalkFile]);

  const verticalBalkCorner = useMemo(() => {
    if (balkCornerFIle.children[0] instanceof Mesh) {
      return balkCornerFIle.children[0].geometry;
    }
    throw new Error("Corner model does not contain a Mesh");
  }, [balkCornerFIle]);

  const lodge = useMemo(() => {
    if (lodgeFile.children[0] instanceof Mesh) {
      return centerGeometry(lodgeFile.children[0].geometry);
    }
    throw new Error("Lodge model does not contain a Mesh");
  }, [lodgeFile]);

  const roofUnderlay = useMemo(() => {
    if (roofUnderlayFile.children[0] instanceof Mesh) {
      return centerGeometry(roofUnderlayFile.children[0].geometry);
    }
    throw new Error("Roof underlay model does not contain a Mesh");
  }, [roofUnderlayFile]);

  const topLodge = useMemo(() => {
    if (topLodgeFile.children[0] instanceof Mesh) {
      return centerGeometry(topLodgeFile.children[0].geometry);
    }
    throw new Error("Roof underlay model does not contain a Mesh");
  }, [topLodgeFile]);

  return (
    <AssetsContext.Provider
      value={{
        verticalBalk,
        horizontalBalk,
        verticalBalkCorner,
        lodge,
        roofUnderlay,
        topLodge,
        wood1,
        wood2,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
}
