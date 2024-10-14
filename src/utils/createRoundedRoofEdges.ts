import { Euler, Vector3 } from "three";

// const offsetStraight = 0.134;

export const createRoundedRoofEdges = (
  width: number,
  depth: number,
  padding: number
) => {
  return [
    // X- (left side)
    {
      position: new Vector3(-width * 0.5 - 0.13 - padding, 2.51 + 0.057, 0),
      scale: new Vector3(depth + 0.13, 1.675, 1.19),
      rotation: new Euler(0, Math.PI * 0.5, 0),
    },
    // X+ (right side)
    {
      position: new Vector3(width * 0.5 + 0.13 + padding, 2.51 + 0.057, 0),
      scale: new Vector3(depth + 0.13, 1.675, 1.19),
      rotation: new Euler(0, Math.PI * 1.5, 0),
    },
    // Z- (bottom side)
    {
      position: new Vector3(0, 2.51 + 0.057, depth * -0.5 - 0.13 - padding),
      scale: new Vector3(width + 0.13, 1.675, 1.19),
      rotation: new Euler(0, 0, 0),
    },
    // Z+ (top side)
    {
      position: new Vector3(0, 2.51 + 0.057, depth * 0.5 + 0.13 + padding),
      scale: new Vector3(width + 0.13, 1.675, 1.19),
      rotation: new Euler(0, Math.PI, 0),
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
        -width * 0.5 - 0.131 - padding * 0.5,
        2.51 + 0.057,
        depth * 0.5 + 0.131 + padding * 0.5
      ),
      scale: new Vector3(1.19, 1.675, 1.19),
      rotation: new Euler(0, Math.PI * 0.5, 0),
    },
    // Top-right corner (X+, Z+)
    {
      position: new Vector3(
        width * 0.5 + 0.131 + padding * 0.5,
        2.51 + 0.057,
        depth * 0.5 + 0.131 + padding * 0.5
      ),
      scale: new Vector3(1.19, 1.675, 1.19),
      rotation: new Euler(0, Math.PI, 0),
    },
    // Bottom-left corner (X-, Z-)
    {
      position: new Vector3(
        -width * 0.5 - 0.131 - padding * 0.5,
        2.51 + 0.057,
        depth * -0.5 - 0.131 - padding * 0.5
      ),
      scale: new Vector3(1.19, 1.675, 1.19),
      rotation: new Euler(0, 0, 0),
    },
    // Bottom-right corner (X+, Z-)
    {
      position: new Vector3(
        width * 0.5 + 0.131 + padding * 0.5,
        2.51 + 0.057,
        depth * -0.5 - 0.131 - padding * 0.5
      ),
      scale: new Vector3(1.19, 1.675, 1.19),
      rotation: new Euler(0, Math.PI * 1.5, 0),
    },
  ];
};

export const createStraightRoofEdges = (
  width: number,
  depth: number,
  padding: number
) => {
  return [
    // X- (left side)
    {
      position: new Vector3(-width * 0.5 - 0.13 - padding, 2.51 + 0.057, 0),
      scale: new Vector3(depth + 0.154, 1.34, 1.545),
      rotation: new Euler(0, Math.PI * 0.5, 0),
    },
    // X+ (right side)
    {
      position: new Vector3(width * 0.5 + 0.13 + padding, 2.51 + 0.057, 0),
      scale: new Vector3(depth + 0.154, 1.34, 1.545),
      rotation: new Euler(0, Math.PI * 1.5, 0),
    },
    // Z- (bottom side)
    {
      position: new Vector3(0, 2.51 + 0.057, depth * -0.5 - 0.13 - padding),
      scale: new Vector3(width + 0.154, 1.34, 1.545),
      rotation: new Euler(0, 0, 0),
    },
    // Z+ (top side)
    {
      position: new Vector3(0, 2.51 + 0.057, depth * 0.5 + 0.13 + padding),
      scale: new Vector3(width + 0.154, 1.34, 1.545),
      rotation: new Euler(0, Math.PI, 0),
    },
  ];
};

export const createStraightRoofEdgeCorners = (
  width: number,
  depth: number,
) => {
  return [
    // Top-left corner (X-, Z+)
    {
      position: new Vector3(
        -width * 0.5 - 0.15382,
        2.51 + 0.057,
        depth * 0.5 + 0.154
      ),
      scale: new Vector3(1.544, 1.34, 1.54),
      rotation: new Euler(0, Math.PI * 0.5, 0),
    },
    // Top-right corner (X+, Z+)
    {
      position: new Vector3(
        width * 0.5 + 0.15382,
        2.51 + 0.057,
        depth * 0.5 + 0.154
      ),
      scale: new Vector3(1.544, 1.34, 1.54),
      rotation: new Euler(0, Math.PI, 0),
    },
    // Bottom-left corner (X-, Z-)
    {
      position: new Vector3(
        -width * 0.5 - 0.15382,
        2.51 + 0.057,
        depth * -0.5 - 0.154
      ),
      scale: new Vector3(1.544, 1.34, 1.54),
      rotation: new Euler(0, 0, 0),
    },
    // Bottom-right corner (X+, Z-)
    {
      position: new Vector3(
        width * 0.5 + 0.15382,
        2.51 + 0.057,
        depth * -0.5 - 0.15382
      ),
      scale: new Vector3(1.544, 1.34, 1.54),
      rotation: new Euler(0, Math.PI * 1.5, 0),
    },
  ];
};
