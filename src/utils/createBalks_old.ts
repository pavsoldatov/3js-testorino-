/**
import { Euler, Vector3 } from "three";
import { BalkInstance, CornerInstance } from "../types";

//! saved for reference
enum Edge {
  Bottom,
  Right,
  Top,
  Left,
}

enum CornerType {
  BottomLeft,
  BottomRight,
  TopRight,
  TopLeft,
}

export const createBalksAndCorners2 = (
  width: number,
  depth: number,
  threshold: number
): { balks: BalkInstance[]; corners: CornerInstance[] } => {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;

  // Calculate the number of segments along width and depth
  const segmentsWidth = Math.ceil(width / threshold);
  const segmentsDepth = Math.ceil(depth / threshold);

  const rotation = new Euler(0, 0, 0);

  // Precompute ratios for width and depth segments
  const ratiosWidth = Array.from(
    { length: segmentsWidth + 1 },
    (_, i) => i / segmentsWidth
  );
  const ratiosDepth = Array.from(
    { length: segmentsDepth + 1 },
    (_, i) => i / segmentsDepth
  );

  // Generate positions along edges using vectorized approach
  const positions: { x: number; z: number }[] = [];

  // Bottom edge: from (-halfWidth, -halfDepth) to (halfWidth, -halfDepth)
  positions.push(
    ...ratiosWidth.map((ratio) => ({
      x: -halfWidth + ratio * width,
      z: -halfDepth,
    }))
  );

  // Right edge: from (halfWidth, -halfDepth) to (halfWidth, halfDepth)
  positions.push(
    ...ratiosDepth.slice(1).map((ratio) => ({
      x: halfWidth,
      z: -halfDepth + ratio * depth,
    }))
  );

  // Top edge: from (halfWidth, halfDepth) to (-halfWidth, halfDepth)
  positions.push(
    ...ratiosWidth.slice(1).map((ratio) => ({
      x: halfWidth - ratio * width,
      z: halfDepth,
    }))
  );

  // Left edge: from (-halfWidth, halfDepth) to (-halfWidth, -halfDepth)
  positions.push(
    ...ratiosDepth.slice(1, -1).map((ratio) => ({
      x: -halfWidth,
      z: halfDepth - ratio * depth,
    }))
  );

  const balks: BalkInstance[] = [];
  const corners: CornerInstance[] = [];

  // Helper functions to determine edge and corner types
  const epsilon = 1e-6;

  const getEdge = (x: number, z: number): Edge | null => {
    if (Math.abs(z + halfDepth) < epsilon) return Edge.Bottom;
    if (Math.abs(x - halfWidth) < epsilon) return Edge.Right;
    if (Math.abs(z - halfDepth) < epsilon) return Edge.Top;
    if (Math.abs(x + halfWidth) < epsilon) return Edge.Left;
    return null;
  };

  const getCornerType = (x: number, z: number): CornerType | null => {
    if (Math.abs(x + halfWidth) < epsilon && Math.abs(z + halfDepth) < epsilon)
      return CornerType.TopLeft;
    if (Math.abs(x - halfWidth) < epsilon && Math.abs(z + halfDepth) < epsilon)
      return CornerType.TopRight;
    if (Math.abs(x - halfWidth) < epsilon && Math.abs(z - halfDepth) < epsilon)
      return CornerType.BottomRight;
    if (Math.abs(x + halfWidth) < epsilon && Math.abs(z - halfDepth) < epsilon)
      return CornerType.BottomLeft;
    return null;
  };

  // Function to generate corners for each balk
  const generateCornersForBalk = (x: number, z: number): CornerInstance[] => {
    const position = new Vector3(x, 0, z);
    const balkCorners: CornerInstance[] = [];

    const cornerType = getCornerType(x, z);
    if (cornerType !== null) {
      // Balk is at a rectangle corner
      let rotation1 = 0;
      let rotation2 = 0;
      switch (cornerType) {
        case CornerType.TopLeft:
          rotation1 = Math.PI * 2; // Facing right (+X)
          rotation2 = Math.PI * 1.5; // Facing bottom (+Z)
          break;
        case CornerType.TopRight:
          rotation1 = Math.PI; // Facing left (-X)
          rotation2 = Math.PI * 1.5; // Facing bottom (+Z)
          break;
        case CornerType.BottomRight:
          rotation1 = Math.PI; // Facing left (-X)
          rotation2 = Math.PI * 0.5; // Facing up (-Z)
          break;
        case CornerType.BottomLeft:
          rotation1 = 0; // Facing right (+X)
          rotation2 = Math.PI * 0.5; // Facing up (-Z)
          break;
      }
      balkCorners.push({ position, rotation: new Euler(0, rotation1, 0) });
      balkCorners.push({ position, rotation: new Euler(0, rotation2, 0) });
    } else {
      // Balk is along an edge (midpoint)
      const edge = getEdge(x, z);
      if (edge !== null) {
        let rotation1 = 0;
        let rotation2 = 0;
        switch (edge) {
          case Edge.Bottom:
          case Edge.Top:
            rotation1 = 0; // Facing right (+X)
            rotation2 = Math.PI; // Facing left (-X)
            break;
          case Edge.Right:
          case Edge.Left:
            rotation1 = Math.PI * 1.5; // Facing up (+Z)
            rotation2 = Math.PI * 0.5; // Facing up (-Z)
            break;
        }
        balkCorners.push({ position, rotation: new Euler(0, rotation1, 0) });
        balkCorners.push({ position, rotation: new Euler(0, rotation2, 0) });
      }
    }
    return balkCorners;
  };

  // Create BalkInstances and their corners
  for (const pos of positions) {
    const position = new Vector3(pos.x, 0, pos.z);
    balks.push({ position, rotation });

    const balkCorners = generateCornersForBalk(pos.x, pos.z);
    corners.push(...balkCorners);
  }

  return { balks, corners };
};
 */