import { useMemo } from "react";
import { Euler, Vector3 } from "three";
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
import { useDimensionsStore } from "../store/dimensionsStore";
import { useGeometryStore } from "../store/geometryStore";
import { RoofEdges } from "./RoofEdges";

export interface BalkInstance {
  position: Vector3;
  rotation: Euler;
}

export type CornerInstance = BalkInstance;

export function CanopyGroup() {
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
    ruberoids,
    woods,
    metals,
  } = useAssets();
  const { width, depth } = useDimensionsStore();

  const { balks, corners } = useMemo(
    () => createBalksAndCorners(width, depth),
    [depth, width]
  );
  const { selectedRoofEdgeGeometryKey } = useGeometryStore();

  const verticalBalkWidth = 0.15;
  const lodgeDepth = 0.02;
  const overhangOuter = 0.18;
  const overhangInner = overhangOuter - lodgeDepth;
  const innerOffsetHeightIncrement = 0.1;

  return (
    <>
      <group>
        <RoofEdges
          width={width}
          depth={depth}
          edgeGeometry={
            selectedRoofEdgeGeometryKey === "rounded"
              ? roofEdgeRounded
              : roofEdgeStraight
          }
          cornerGeometry={
            selectedRoofEdgeGeometryKey === "rounded"
              ? roofEdgeCornerRounded
              : roofEdgeCornerStraight
          }
          materials={metals}
        />

        <RuberoidRoof
          width={width}
          depth={depth}
          geometry={roof}
          materials={ruberoids}
          overhangOuter={overhangOuter}
        />

        <RoofUnderlaySideLodges
          width={width}
          depth={depth}
          geometry={roofUnderlaySideLodge}
          materials={woods}
        />

        <RoofUnderlayLodges
          width={width}
          depth={depth}
          geometry={roofUnderlayLodge}
          materials={woods}
        />

        <RoofUnderlays
          width={width + overhangInner * 2}
          depth={depth + overhangInner * 2}
          geometry={roofUnderlay}
          materials={woods}
        />

        <Lodges
          width={width}
          depth={depth}
          geometry={lodge}
          materials={woods}
          verticalBalkWidth={verticalBalkWidth}
          lodgeDepth={lodgeDepth}
          innerOffsetHeightIncrement={innerOffsetHeightIncrement}
          overhangInner={overhangInner}
          overhangOuter={overhangOuter}
        />

        <HorizontalBalks
          width={width}
          depth={depth}
          geometry={horizontalBalk}
          materials={woods}
        />

        <VerticalBalks
          balks={balks}
          geometry={verticalBalk}
          materials={woods}
          limit={BUFFERED_BALKS_LIMIT}
        />

        <VerticalBalkCorners
          corners={corners}
          geometry={verticalBalkCorner}
          materials={woods}
          limit={BUFFERED_CORNERS_LIMIT}
        />
      </group>
    </>
  );
}
