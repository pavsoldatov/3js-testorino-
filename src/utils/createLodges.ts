import { Euler, Vector3 } from "three";
import { HorizontalBalkInstance } from "./createHorizontalBalks";

export interface LodgeConfigParams {
  width: number;
  depth: number;
  verticalBalkWidth: number;
  lodgeDepth: number;
  innerOffsetHeightIncrement: number;
  overhangInner: number;
  overhangOuter: number;
}

type LodgeInstance = HorizontalBalkInstance;

export function createLodges({
  width,
  depth,
  lodgeDepth,
  innerOffsetHeightIncrement,
  overhangInner,
  overhangOuter,
}: LodgeConfigParams): LodgeInstance[] {
  const lodgeHeight = 0.2;

  return [
    // Inner
    // top
    {
      position: new Vector3(
        0,
        2.20001 + lodgeHeight * 0.5 + innerOffsetHeightIncrement,
        -depth * 0.5 - lodgeDepth * 0.5 - overhangInner
      ),
      rotation: new Euler(0, 0, 0),
      scale: new Vector3(width + overhangInner * 2, 1, 1),
    },
    // bottom
    {
      position: new Vector3(
        0,
        2.20001 + lodgeHeight * 0.5 + innerOffsetHeightIncrement,
        depth * 0.5 + lodgeDepth * 0.5 + overhangInner
      ),
      rotation: new Euler(0, 0, 0),
      scale: new Vector3(width + overhangInner * 2, 1, 1),
    },
    // left
    {
      position: new Vector3(
        -width * 0.5 - lodgeDepth * 0.5 - overhangInner,
        2.20001 + lodgeHeight * 0.5 + innerOffsetHeightIncrement,
        0
      ),
      rotation: new Euler(0, Math.PI * 0.5, 0),
      scale: new Vector3(depth + lodgeDepth * 2 + overhangInner * 2, 1, 1),
    },
    // right
    {
      position: new Vector3(
        width * 0.5 + lodgeDepth * 0.5 + overhangInner,
        2.20001 + lodgeHeight * 0.5 + innerOffsetHeightIncrement,
        0
      ),
      rotation: new Euler(0, Math.PI * 0.5, 0),
      scale: new Vector3(depth + lodgeDepth * 2 + overhangInner * 2, 1, 1),
    },

    // Outer
    // top
    {
      position: new Vector3(
        0,
        2.20001 + lodgeHeight * 0.5 + innerOffsetHeightIncrement * 2,
        -depth * 0.5 - lodgeDepth * 0.5 - overhangOuter
      ),
      rotation: new Euler(Math.PI, 0, 0),
      scale: new Vector3(width + overhangOuter * 2, 1, 1),
    },
    // bottom
    {
      position: new Vector3(
        0,
        2.20001 + lodgeHeight * 0.5 + innerOffsetHeightIncrement * 2,
        depth * 0.5 + lodgeDepth * 0.5 + overhangOuter
      ),
      rotation: new Euler(Math.PI, 0, 0),
      scale: new Vector3(width + overhangOuter * 2, 1, 1),
    },
    // left
    {
      position: new Vector3(
        -width * 0.5 - lodgeDepth * 0.5 - overhangOuter,
        2.20001 + lodgeHeight * 0.5 + innerOffsetHeightIncrement * 2,
        0
      ),
      rotation: new Euler(Math.PI, Math.PI * 0.5, 0),
      scale: new Vector3(depth + lodgeDepth * 2 + overhangOuter * 2, 1, 1),
    },
    // right
    {
      position: new Vector3(
        width * 0.5 + lodgeDepth * 0.5 + overhangOuter,
        2.20001 + lodgeHeight * 0.5 + innerOffsetHeightIncrement * 2,
        0
      ),
      rotation: new Euler(Math.PI, Math.PI * 0.5, 0),
      scale: new Vector3(depth + lodgeDepth * 2 + overhangOuter * 2, 1, 1),
    },
  ];
}

// [
//     // inner lodges:
//     // south
//     {
//       position: new Vector3(
//         dimensions.width * -0.5 - balkWidthOffset - overhangInner,
//         2.199 + innerOffsetHeightIncrement,
//         dimensions.depth * 0.5 + balkWidthOffset + overhangInner
//       ),
//       rotation: new Euler(0, 0, 0),
//       scale: new Vector3(
//         dimensions.width + balkWidth + overhangInner * 2,
//         1,
//         1
//       ),
//     },

//     // west
//     {
//       position: new Vector3(
//         dimensions.width * -0.5 - lodgeDepth - balkWidthOffset - overhangInner,
//         2.199 + innerOffsetHeightIncrement,
//         dimensions.depth * 0.5 + balkWidthOffset + lodgeDepth + overhangInner
//       ),
//       rotation: new Euler(0, Math.PI * 0.5, 0),
//       scale: new Vector3(
//         dimensions.depth + balkWidth + lodgeDepth * 2 + overhangInner * 2,
//         1,
//         1
//       ),
//     },

//     // north
//     {
//       position: new Vector3(
//         dimensions.width * -0.5 - balkWidthOffset - overhangInner,
//         2.199 + innerOffsetHeightIncrement,
//         dimensions.depth * -0.5 - balkWidthOffset - lodgeDepth - overhangInner
//       ),
//       rotation: new Euler(0, 0, 0),
//       scale: new Vector3(
//         dimensions.width + balkWidth + overhangInner * 2,
//         1,
//         1
//       ),
//     },

//     // east
//     {
//       position: new Vector3(
//         dimensions.width * 0.5 + balkWidthOffset + overhangInner,
//         2.199 + innerOffsetHeightIncrement,
//         dimensions.depth * 0.5 + balkWidthOffset + lodgeDepth + overhangInner
//       ),
//       rotation: new Euler(0, Math.PI * 0.5, 0),
//       scale: new Vector3(
//         dimensions.depth + balkWidth + lodgeDepth * 2 + overhangInner * 2,
//         1,
//         1
//       ),
//     },

//     // outer lodges:
//     // south
//     {
//       position: new Vector3(
//         dimensions.width * -0.5 - balkWidthOffset - overhangOuter,
//         2.199 + innerOffsetHeightIncrement * 2,
//         dimensions.depth * 0.5 + balkWidthOffset + overhangOuter
//       ),
//       rotation: new Euler(0, 0, 0),
//       scale: new Vector3(
//         dimensions.width + balkWidth + overhangOuter * 2,
//         1,
//         1
//       ),
//     },

//     // west
//     {
//       position: new Vector3(
//         dimensions.width * -0.5 - lodgeDepth - balkWidthOffset - overhangOuter,
//         2.199 + innerOffsetHeightIncrement * 2,
//         dimensions.depth * 0.5 + balkWidthOffset + lodgeDepth + overhangOuter
//       ),
//       rotation: new Euler(0, Math.PI * 0.5, 0),
//       scale: new Vector3(
//         dimensions.depth + balkWidth + lodgeDepth * 2 + overhangOuter * 2,
//         1,
//         1
//       ),
//     },

//     // north
//     {
//       position: new Vector3(
//         dimensions.width * -0.5 - balkWidthOffset - overhangOuter,
//         2.199 + innerOffsetHeightIncrement * 2,
//         dimensions.depth * -0.5 - balkWidthOffset - lodgeDepth - overhangOuter
//       ),
//       rotation: new Euler(0, 0, 0),
//       scale: new Vector3(
//         dimensions.width + balkWidth + overhangOuter * 2,
//         1,
//         1
//       ),
//     },

//     // east
//     {
//       position: new Vector3(
//         dimensions.width * 0.5 + balkWidthOffset + overhangOuter,
//         2.199 + innerOffsetHeightIncrement * 2,
//         dimensions.depth * 0.5 + balkWidthOffset + lodgeDepth + overhangOuter
//       ),
//       rotation: new Euler(0, Math.PI * 0.5, 0),
//       scale: new Vector3(
//         dimensions.depth + balkWidth + lodgeDepth * 2 + overhangOuter * 2,
//         1,
//         1
//       ),
//     },
//   ];
