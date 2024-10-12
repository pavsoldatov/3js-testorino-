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
  Material,
  MeshStandardMaterial,
  Vector2,
  LinearFilter,
  LinearMipmapLinearFilter,
  LinearSRGBColorSpace,
  NearestMipMapNearestFilter,
  NearestFilter,
} from "three";
import { AssetsContext } from "./AssetsContext";
import { applyWoodShader } from "../../shaders/woodShader";
import { centerGeometry } from "../../utils/centerGeometry";

import verticalBalkSrc from "../../assets/models/balk_150x150x2200.obj?url";
import horizontalBalkSrc from "../../assets/models/balk_150x150x1000.obj?url";
import balkCornerSrc from "../../assets/models/balk_corner.obj?url";
import lodgeSrc from "../../assets/models/Lodge_20x200x1000.obj?url";
import roofUnderlaySrc from "../../assets/models/Lodge_20x190x1000_bevel.obj?url";
import roofUnderlayLodgeSrc from "../../assets/models/lodge_150x50x1000.obj?url";
import roofUnderlaySideLodgeSrc from "../../assets/models/lodge_150x50x200.obj?url";
import roofSrc from "../../assets/models/ruberoid_1000x1000x2.obj?url";
import roofEdgeRoundedSrc from "../../assets/models/roof_edge/roof_edge_1m.obj?url";
import roofEdgeStraightSrc from "../../assets/models/roof_edge/roof_edge_1m2.obj?url";
import roofEdgeCornerStraightSrc from "../../assets/models/roof_edge/roof_edge_corner2.obj?url";
import roofEdgeCornerRoundedSrc from "../../assets/models/roof_edge/roof_edge_corner.obj?url";
// import perimeterClosedSrc from "../../assets/models/profile_canopy_perimeter_closed.obj?url";

import materialsFile from "../../assets/Canopy_Materials.glb?url";
import roofEdgeMaterialsFile from "../../assets/models/roof_edge/roof_edge_materials.gltf?url";

import balkTextureSrc from "../../assets/textures/texture_wood.jpg?url";
import balkNormalMap from "../../assets/textures/texture_wood_normal.jpg?url";
import ruberoidTextureSrc from "../../assets/textures/roof_texture.jpg?url";
import ruberoidNormalMap1Src from "../../assets/textures/roof_texture_normal_map.jpg?url";
import ruberoidNormalMap2Src from "../../assets/textures/roof_texture_normal_map22.jpg?url";
import roofEdgeStraightNormalSrc from "../../assets/models/roof_edge/T_RoofEdge_Straight_Normal.png?url";
import roofEdgeRoundedNormalSrc from "../../assets/models/roof_edge/T_RoofEdge_Round_R20_Normal.png?url";

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

  const roofEdgeCornerStraightNormal = useLoader(
    TextureLoader,
    roofEdgeStraightNormalSrc
  );
  const roofEdgeCornerRoundedNormal = useLoader(
    TextureLoader,
    roofEdgeRoundedNormalSrc
  );

  const wood1 = useMemo(() => {
    const woodMaterial = materialsGltf.materials["wood.001"];
    return woodMaterial.clone();
  }, [materialsGltf.materials]);

  const roofEdgeMaterials = useMemo(() => {
    const extractedMaterials: { [key: string]: Material } = {};
    Object.keys(roofEdgeMaterialsGltf.materials).forEach((key) => {
      const cloned = roofEdgeMaterialsGltf.materials[
        key
      ].clone() as MeshStandardMaterial;

      // cloned.normalMap = roofEdgeCornerRoundedNormal;
      // cloned.normalMap.wrapS = cloned.normalMap.wrapT = RepeatWrapping;
      // cloned.normalMap.needsUpdate = true;
      extractedMaterials[key] = cloned;
    });
    return extractedMaterials;
  }, [roofEdgeMaterialsGltf.materials]);

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

    // // Reminder: toggle in gui
    material.onBeforeCompile = applyWoodShader;

    return material;
  }, [texture, normalMap]);

  const ruberoid1 = useMemo(() => {
    ruberoidTexture.colorSpace = SRGBColorSpace;
    ruberoidTexture.wrapS = ruberoidTexture.wrapT = RepeatWrapping;
    ruberoidNormalMap1.wrapS = ruberoidNormalMap1.wrapT = RepeatWrapping;

    const material = new MeshPhysicalMaterial({
      map: ruberoidTexture,
      normalMap: ruberoidNormalMap1,
      metalness: 1.7,
      roughness: 0.7,
    });

    return material;
  }, [ruberoidNormalMap1, ruberoidTexture]);

  const ruberoid2 = useMemo(() => {
    ruberoidTexture.colorSpace = SRGBColorSpace;
    ruberoidTexture.wrapS = ruberoidTexture.wrapT = RepeatWrapping;
    ruberoidNormalMap2.wrapS = ruberoidNormalMap2.wrapT = RepeatWrapping;

    const material = new MeshPhysicalMaterial({
      map: ruberoidTexture,
      normalMap: ruberoidNormalMap2,
      metalness: 1.7,
      roughness: 0.7,
    });

    return material;
  }, [ruberoidNormalMap2, ruberoidTexture]);

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
        ruberoid1,
        ruberoid2,
        wood1,
        wood2,
        roofEdgeMaterials,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
}
