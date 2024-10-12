import { Euler, Vector3 } from "three";

const offsetStraight = 0.134;

export const createRoundedRoofEdges = (
  width: number,
  depth: number,
  padding: number
) => {
  return [
    // X- (left side)
    {
      position: new Vector3(-width * 0.5 - 0.105 - padding, 2.51 + 0.057, 0),
      scale: new Vector3(depth, 1.675, 1.675),
      rotation: new Euler(0, Math.PI * 0.5, 0),
      scaleU: depth * -1,
      mirroredUv: true,
    },
    // X+ (right side)
    {
      position: new Vector3(width * 0.5 + 0.105 + padding, 2.51 + 0.057, 0),
      scale: new Vector3(depth, 1.675, 1.675),
      rotation: new Euler(0, Math.PI * 1.5, 0),
      scaleU: depth,
      mirroredUv: false,
    },
    // Z- (bottom side)
    {
      position: new Vector3(0, 2.51 + 0.057, depth * -0.5 - 0.105 - padding),
      scale: new Vector3(width, 1.675, 1.675),
      rotation: new Euler(0, 0, 0),
      scaleU: width * -1,
      mirroredUv: true,
    },
    // Z+ (top side)
    {
      position: new Vector3(0, 2.51 + 0.057, depth * 0.5 + 0.105 + padding),
      scale: new Vector3(width, 1.675, 1.675),
      rotation: new Euler(0, Math.PI, 0),
      scaleU: width,
      mirroredUv: false,
    },
  ];
};

export const createRoundedRoofEdgeCorners = (
  width: number,
  depth: number,
  padding: number
) => {
  return [
    // Top-left corner (X-, Z+)
    {
      position: new Vector3(
        -width * 0.5 - 0.0825 - padding,
        2.51 + 0.057,
        depth * 0.5 + 0.0825 + padding
      ),
      scale: new Vector3(1.675, 1.675, 1.675),
      rotation: new Euler(0, Math.PI * 0.5, 0),
    },
    // Top-right corner (X+, Z+)
    {
      position: new Vector3(
        width * 0.5 + 0.0825 + padding,
        2.51 + 0.057,
        depth * 0.5 + 0.0825 + padding
      ),
      scale: new Vector3(1.675, 1.675, 1.675),
      rotation: new Euler(0, Math.PI, 0),
    },
    // Bottom-left corner (X-, Z-)
    {
      position: new Vector3(
        -width * 0.5 - 0.0825 - padding,
        2.51 + 0.057,
        depth * -0.5 - 0.0825 - padding
      ),
      scale: new Vector3(1.675, 1.675, 1.675),
      rotation: new Euler(0, 0, 0),
    },
    // Bottom-right corner (X+, Z-)
    {
      position: new Vector3(
        width * 0.5 + 0.0825 + padding,
        2.51 + 0.057,
        depth * -0.5 - 0.0825 - padding
      ),
      scale: new Vector3(1.675, 1.675, 1.675),
      rotation: new Euler(0, Math.PI * 1.5, 0),
    },
  ];
};
