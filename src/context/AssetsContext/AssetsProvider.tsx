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
  MeshStandardMaterial,
} from "three";
import { AssetsContext, Metals, Ruberoids, Woods } from "./AssetsContext";
import { applyWoodShader } from "../../shaders/woodShader";
import { centerGeometry } from "../../utils/centerGeometry";
import { useMaterialStore } from "../../store/materialStore";

import verticalBalkSrc from "/models/balk_150x150x2200.obj?url";
import horizontalBalkSrc from "/models/balk_150x150x1000.obj?url";
import balkCornerSrc from "/models/balk_corner.obj?url";
import lodgeSrc from "/models/Lodge_20x200x1000.obj?url";
import roofUnderlaySrc from "/models/Lodge_20x190x1000_bevel.obj?url";
import roofUnderlayLodgeSrc from "/models/lodge_150x50x1000.obj?url";
import roofUnderlaySideLodgeSrc from "/models/lodge_150x50x200.obj?url";
import roofSrc from "/models/ruberoid_1000x1000x2.obj?url";
import roofEdgeRoundedSrc from "/models/roof_edge/roof_edge_1m.obj?url";
import roofEdgeStraightSrc from "/models/roof_edge/roof_edge_1m2.obj?url";
import roofEdgeCornerStraightSrc from "/models/roof_edge/roof_edge_corner2.obj?url";
import roofEdgeCornerRoundedSrc from "/models/roof_edge/roof_edge_corner.obj?url";

import materialsFile from "/Canopy_Materials.glb?url";
import roofEdgeMaterialsFile from "/models/roof_edge/Edges.gltf?url";

import balkTextureSrc from "/textures/texture_wood.jpg?url";
import balkNormalMap from "/textures/texture_wood_normal.jpg?url";
import ruberoidTextureSrc from "/textures/roof_texture.jpg?url";
import ruberoidNormalMap1Src from "/textures/roof_texture_normal_map.jpg?url";
import ruberoidNormalMap2Src from "/textures/roof_texture_normal_map22.jpg?url";

export function AssetsProvider({ children }: { children: ReactNode }) {
  const materialsGltf = useGLTF(materialsFile);
  const roofEdgeMaterialsGltf = useGLTF(roofEdgeMaterialsFile);

  const balkFile = useLoader(OBJLoader, verticalBalkSrc); // vertical
  const balkCornerFIle = useLoader(OBJLoader, balkCornerSrc); // vertical balk corner
  const horizontalBalkFile = useLoader(OBJLoader, horizontalBalkSrc); // horizontal
  const lodgeFile = useLoader(OBJLoader, lodgeSrc); // an outer rim around the structure
  const roofUnderlayFile = useLoader(OBJLoader, roofUnderlaySrc); // roof underlay attached to the outer rim
  const roofUnderlayLodgeFile = useLoader(OBJLoader, roofUnderlayLodgeSrc); // lodges underneath the roof overlay placed on top of horizontal balks
  const roofUnderlaySideLodgeFile = useLoader(
    OBJLoader,
    roofUnderlaySideLodgeSrc
  ); // smaller lodges underneath the roof overlay placed between the horizontal balks and the overhang
  const roofFile = useLoader(OBJLoader, roofSrc); // ruberoid roofing on top of the underlay
  const roofEdgeStraightFile = useLoader(OBJLoader, roofEdgeStraightSrc);
  const roofEdgeRoundedFile = useLoader(OBJLoader, roofEdgeRoundedSrc);
  const roofEdgeCornerStraightFile = useLoader(
    OBJLoader,
    roofEdgeCornerStraightSrc
  );
  const roofEdgeCornerRoundedFile = useLoader(
    OBJLoader,
    roofEdgeCornerRoundedSrc
  );

  const texture = useLoader(TextureLoader, balkTextureSrc);
  const normalMap = useLoader(TextureLoader, balkNormalMap);
  const ruberoidTexture = useLoader(TextureLoader, ruberoidTextureSrc);
  const ruberoidNormalMap1 = useLoader(TextureLoader, ruberoidNormalMap1Src);
  const ruberoidNormalMap2 = useLoader(TextureLoader, ruberoidNormalMap2Src);

  const woods = useMemo<Woods>(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.wrapS = texture.wrapT = RepeatWrapping;
    normalMap.wrapS = normalMap.wrapT = RepeatWrapping;

    const wood1 = materialsGltf.materials["wood.001"].clone();

    const wood2 = new MeshPhysicalMaterial({
      map: texture,
      normalMap: normalMap,
      roughness: 0.25,
      clearcoat: 0.75, // sheen
      clearcoatRoughness: 0.5,
    });

    const wood3 = wood2.clone();
    wood3.onBeforeCompile = applyWoodShader;

    return {
      wood1: wood1 as MeshPhysicalMaterial,
      wood2: wood2, // wood2 without shader
      wood3: wood3, // wood2 with shader applied
    };
  }, [materialsGltf, texture, normalMap]);

  const metals = useMemo<Metals>(() => {
    const materials = roofEdgeMaterialsGltf.materials;
    const extractedMetals: Partial<Metals> = {};

    Object.entries(materials).forEach(([key, material]) => {
      const clonedMaterial = material.clone() as MeshStandardMaterial;

      switch (key) {
        case "M_RoofEdge_1":
          extractedMetals.whiteMetal = clonedMaterial;
          break;
        case "M_RoofEdge_2":
          extractedMetals.silverMetal = clonedMaterial;
          break;
        case "M_RoofEdge_3":
          extractedMetals.blackMetal = clonedMaterial;
          break;
        default:
          console.warn(`Unexpected material key: ${key}`);
          break;
      }
    });

    return extractedMetals as Metals;
  }, [roofEdgeMaterialsGltf.materials]);

  const roofMetalness = useMaterialStore((state) => state.roofMetalness);
  const roofRoughness = useMaterialStore((state) => state.roofRoughness);

  const ruberoids = useMemo<Ruberoids>(() => {
    ruberoidTexture.colorSpace = SRGBColorSpace;
    ruberoidTexture.wrapS = ruberoidTexture.wrapT = RepeatWrapping;

    ruberoidNormalMap1.wrapS = ruberoidNormalMap1.wrapT = RepeatWrapping;
    ruberoidNormalMap2.wrapS = ruberoidNormalMap2.wrapT = RepeatWrapping;

    return {
      ruberoid1: new MeshPhysicalMaterial({
        map: ruberoidTexture,
        normalMap: ruberoidNormalMap1,
        metalness: roofMetalness,
        roughness: roofRoughness,
      }),
      ruberoid2: new MeshPhysicalMaterial({
        map: ruberoidTexture,
        normalMap: ruberoidNormalMap2,
        metalness: roofMetalness,
        roughness: roofRoughness,
      }),
    };
  }, [
    ruberoidTexture,
    ruberoidNormalMap1,
    ruberoidNormalMap2,
    roofMetalness,
    roofRoughness,
  ]);

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

  const roofUnderlayLodge = useMemo(() => {
    if (roofUnderlayLodgeFile.children[0] instanceof Mesh) {
      return centerGeometry(roofUnderlayLodgeFile.children[0].geometry);
    }
    throw new Error("Roof underlay model does not contain a Mesh");
  }, [roofUnderlayLodgeFile]);

  const roofUnderlaySideLodge = useMemo(() => {
    if (roofUnderlaySideLodgeFile.children[0] instanceof Mesh) {
      return centerGeometry(roofUnderlaySideLodgeFile.children[0].geometry);
    }
    throw new Error("Roof underlay model does not contain a Mesh");
  }, [roofUnderlaySideLodgeFile]);

  const roof = useMemo(() => {
    if (roofFile.children[0] instanceof Mesh) {
      return centerGeometry(roofFile.children[0].geometry);
    }
    throw new Error("Roof model does not contain a Mesh");
  }, [roofFile]);

  const roofEdgeStraight = useMemo(() => {
    if (roofEdgeStraightFile.children[0] instanceof Mesh) {
      return centerGeometry(roofEdgeStraightFile.children[0].geometry);
    }
    throw new Error("Roof edge (straight) model does not contain a Mesh");
  }, [roofEdgeStraightFile]);

  const roofEdgeRounded = useMemo(() => {
    if (roofEdgeRoundedFile.children[0] instanceof Mesh) {
      return centerGeometry(roofEdgeRoundedFile.children[0].geometry);
    }
    throw new Error("Roof edge (rounded) model does not contain a Mesh");
  }, [roofEdgeRoundedFile]);

  const roofEdgeCornerStraight = useMemo(() => {
    if (roofEdgeCornerStraightFile.children[0] instanceof Mesh) {
      return centerGeometry(roofEdgeCornerStraightFile.children[0].geometry);
    }
    throw new Error(
      "Roof edge corner (straight) model does not contain a Mesh"
    );
  }, [roofEdgeCornerStraightFile]);

  const roofEdgeCornerRounded = useMemo(() => {
    if (roofEdgeCornerRoundedFile.children[0] instanceof Mesh) {
      return centerGeometry(roofEdgeCornerRoundedFile.children[0].geometry);
    }
    throw new Error("Roof edge corner (rounded) model does not contain a Mesh");
  }, [roofEdgeCornerRoundedFile]);

  return (
    <AssetsContext.Provider
      value={{
        verticalBalk,
        horizontalBalk,
        verticalBalkCorner,
        lodge,
        roofUnderlay,
        roofUnderlayLodge,
        roofUnderlaySideLodge,
        roof,
        roofEdgeStraight,
        roofEdgeRounded,
        roofEdgeCornerStraight,
        roofEdgeCornerRounded,
        ruberoids,
        woods,
        metals,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
}
