import { useMemo } from "react";
import { Euler, Vector3 } from "three";
import { useDimensions } from "../hooks/useDimensions";
import { useAssets } from "../hooks/useAssets";
import { createBalksAndCorners } from "../utils/createBalksAndCorners";
import { BUFFERED_BALKS_LIMIT, BUFFERED_CORNERS_LIMIT } from "../constants";
import { HorizontalBalks } from "./HorizontalBalks";
import { VerticalBalks } from "./VerticalBalks";
import { VerticalBalkCorners } from "./VerticalBalkCorners";
import Lodges from "./Lodges";
import { RoofUnderlayLodges } from "./RoofUnderlayLodges";
import RoofUnderlays from "./RoofUnderlays";
import { RoofUnderlaySideLodges } from "./RoofUnderlaySideLodges";
import { RuberoidRoof } from "./RuberoidRoof";
import { RoofEdges } from "./RoofEdges";

export interface BalkInstance {
  position: Vector3;
  rotation: Euler;
}

export type CornerInstance = BalkInstance;

export function BuildingGroup() {
  const {
    verticalBalk,
    horizontalBalk,
    verticalBalkCorner,
    lodge,
    roofUnderlay,
    roofUnderlayLodge,
    roofUnderlaySideLodge,
    roof,
    roofEdgeRounded,
    roofEdgeStraight,
    roofEdgeCornerStraight,
    roofEdgeCornerRounded,
    ruberoid1,
    ruberoid2,
    wood1,
    wood2,
    roofEdgeMaterials,
  } = useAssets();

  const { dimensions } = useDimensions();
  const { balks, corners } = useMemo(() => {
    return createBalksAndCorners(dimensions.width, dimensions.depth);
  }, [dimensions.depth, dimensions.width]);

  const verticalBalkWidth = 0.15;
  const lodgeDepth = 0.02;
  const overhangOuter = 0.18;
  const overhangInner = overhangOuter - lodgeDepth;
  const innerOffsetHeightIncrement = 0.1;

  return (
    <>
      <group>
        <RoofEdges
          width={dimensions.width}
          depth={dimensions.depth}
          edgeGeometry={roofEdgeRounded}
          cornerGeometry={roofEdgeCornerRounded}
          materials={roofEdgeMaterials}
        />

        {/* <RoofEdges
          width={dimensions.width}
          depth={dimensions.depth}
          geometry={roofEdgeRounded}
          cornerGeometry={roofEdgeCornerRounded}
          materials={roofEdgeMaterials}
        /> */}

        {/* <mesh
          geometry={roofEdgeCornerStraight}
          position={
            new Vector3(-dimensions.depth + 0.35, 2.51 + 0.0575, dimensions.depth * -0.5 - 0.175)
          }
          scale={new Vector3(1.34, 1.34, 1.34)}
        /> */}

        <RuberoidRoof
          width={dimensions.width}
          depth={dimensions.depth}
          geometry={roof}
          material={ruberoid1}
          overhangOuter={overhangOuter}
        />

        <RoofUnderlaySideLodges
          width={dimensions.width}
          depth={dimensions.depth}
          geometry={roofUnderlaySideLodge}
          material={wood2}
        />

        <RoofUnderlayLodges
          width={dimensions.width}
          depth={dimensions.depth}
          geometry={roofUnderlayLodge}
          material={wood2}
        />

        <RoofUnderlays
          width={dimensions.width + overhangInner * 2}
          depth={dimensions.depth + overhangInner * 2}
          geometry={roofUnderlay}
          material={wood2}
        />

        <Lodges
          dimensions={dimensions}
          geometry={lodge}
          material={wood2}
          verticalBalkWidth={verticalBalkWidth}
          lodgeDepth={lodgeDepth}
          innerOffsetHeightIncrement={innerOffsetHeightIncrement}
          overhangInner={overhangInner}
          overhangOuter={overhangOuter}
        />

        <HorizontalBalks
          width={dimensions.width}
          depth={dimensions.depth}
          geometry={horizontalBalk}
          material={wood2}
        />

        <VerticalBalks
          balks={balks}
          geometry={verticalBalk}
          material={wood2}
          limit={BUFFERED_BALKS_LIMIT}
        />

        <VerticalBalkCorners
          corners={corners}
          geometry={verticalBalkCorner}
          material={wood2}
          limit={BUFFERED_CORNERS_LIMIT}
        />
      </group>
    </>
  );
}
