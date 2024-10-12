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
