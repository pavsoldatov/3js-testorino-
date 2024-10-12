import {
  Material,
  BufferGeometry,
  MeshStandardMaterial,
  TextureLoader,
} from "three";
import { useEffect, useMemo, useRef } from "react";
import {
  createRoundedRoofEdgeCorners,
  createRoundedRoofEdges,
} from "../utils/createRoundedRoofEdges";
import RoofEdge from "./RoofEdge";
import { RoofEdgeCorner } from "./RoofEdgeCorner";

import roofEdgeStraightNormalSrc from "../assets/models/roof_edge/T_RoofEdge_Straight_Normal.png?url";
import roofEdgeRoundNormalSrc from "../assets/models/roof_edge/T_RoofEdge_Round_R20_Normal.png";
import { useLoader } from "@react-three/fiber";

interface RoofEdgesProps {
  width: number;
  depth: number;
  edgeGeometry?: BufferGeometry;
  cornerGeometry?: BufferGeometry;
  materials?: {
    [key: string]: Material;
  };
}

// TODO: The normal maps are impossible to work with. 
// TODO: They are mapped to some other type of corner and do not work well with the edges.
//? Solution: ditch the normal maps.

export const RoofEdges = ({
  width,
  depth,
  edgeGeometry,
  cornerGeometry,
  materials,
}: RoofEdgesProps) => {
  const padding = 0.034;
  const paddingRounded = padding;
  const paddingStraight = 0.022 + padding;

  const roofEdges = useMemo(
    () => createRoundedRoofEdges(width, depth, paddingRounded),
    [depth, width]
  );
  const roofEdgeCorners = useMemo(
    () => createRoundedRoofEdgeCorners(width, depth, paddingRounded),
    [depth, width]
  );

  const roofEdgesStraight = useMemo(
    () => createRoundedRoofEdges(width, depth, paddingStraight),
    [depth, paddingStraight, width]
  );
  const roofEdgeCornersStraight = useMemo(
    () => createRoundedRoofEdgeCorners(width, depth, padding * 2 - 0.0006),
    [depth, paddingStraight, width]
  );

  const roofEdgeCornerStraightNormal = useLoader(
    TextureLoader,
    roofEdgeStraightNormalSrc
  );
  const roofEdgeCornerRoundNormal = useLoader(
    TextureLoader,
    roofEdgeRoundNormalSrc
  );

  const whiteMetal = materials["M_RoofEdge_1"];
  const silverMetal = materials["M_RoofEdge_2"] as MeshStandardMaterial;
  const blackMetal = materials["M_RoofEdge_3"];

  // silverMetal.normalMap = roofEdgeCornerStraightNormal;
  // silverMetal.needsUpdate = true

  const mat = useMemo(() => {
    return silverMetal?.clone() as MeshStandardMaterial;
  }, [silverMetal]);

  useEffect(() => {
    mat.normalMap = roofEdgeCornerStraightNormal;
    mat.needsUpdate = true;

    return () => {
      if (mat) mat.dispose();
    };
  }, [mat, roofEdgeCornerStraightNormal]);

  const ref = useRef(null);
  const cornerRef = useRef(null);
  // const size = useMeshDimensions(ref);
  // const cornerSize = useMeshDimensions(cornerRef);

  return (
    <group>
      {roofEdgeCorners.map((corner, index) => (
        <RoofEdgeCorner
          key={index}
          geometry={cornerGeometry}
          material={silverMetal}
          position={corner.position}
          scale={corner.scale}
          rotation={corner.rotation}
        />
      ))}

      {roofEdges.map((edge, index) => (
        <RoofEdge
          key={index}
          geometry={edgeGeometry}
          material={silverMetal}
          position={edge.position}
          rotation={edge.rotation}
          scale={edge.scale}
          scaleU={edge.scaleU}
          mirroredUv={edge.mirroredUv}
          offsetU={0.625}
          scaleFactor={1.675}
        />
      ))}
    </group>
  );
};
