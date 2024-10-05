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
import RoofUnderlays from "./RoofUnderlays";

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
    wood1,
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
    <group>
      <RoofUnderlays
        width={dimensions.width + overhangInner * 2}
        depth={dimensions.depth + overhangOuter * 2}
        geometry={roofUnderlay}
        material={wood1}
      />

      <Lodges
        dimensions={dimensions}
        geometry={lodge}
        material={wood1}
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
        material={wood1}
      />
      <VerticalBalks
        balks={balks}
        geometry={verticalBalk}
        material={wood1}
        limit={BUFFERED_BALKS_LIMIT}
      />
      <VerticalBalkCorners
        corners={corners}
        geometry={verticalBalkCorner}
        material={wood1}
        limit={BUFFERED_CORNERS_LIMIT}
      />
    </group>
  );
}

// {
/* <mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(-0.19 * 14 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(-0.19 * 13 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(-0.19 * 12 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(-0.19 * 11 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(-0.19 * 10 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(-0.19 * 9 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(-0.19 * 8 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(-0.19 * 7 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(-0.19 * 6 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(-0.19 * 5 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(-0.19 * 4 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(-0.19 * 3 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(-0.19 * 2 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(-0.19 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 * 2 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 * 3 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 * 4 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 * 5 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 * 6 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 * 7 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 * 8 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 * 9 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 * 10 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 * 11 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 * 12 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 * 13 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 * 14 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/>
<mesh
// height of vertical balk + half its depth to offset the centered origin + height offset + full lodge height
position={
  new Vector3(0.19 * 15 - 0.19 * 0.5, 2.2 + 0.01 + innerOffsetHeightIncrement + 0.2, 0)
}
scale={new Vector3(1, 1, dimensions.depth + 0.18 * 2)}
geometry={roofUnderlay}
material={wood1}
/> */
// }
