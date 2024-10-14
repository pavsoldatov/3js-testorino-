import { Euler, Vector3 } from "three";
import { CornerInstance } from "../components/CanopyGroup";
import { adjustPosition, EPSILON } from "./createBalks";

/**
 * Enum representing the type of edge.
 */
export enum EdgeType {
  Horizontal,
  Vertical,
}

/**
 * Enum representing the type of corner.
 */
export enum CornerType {
  BottomLeft,
  BottomRight,
  TopRight,
  TopLeft,
}

/**
 * Map of edge types to their rotations.
 */
const edgeRotationMap: Record<EdgeType, [number, number]> = {
  [EdgeType.Horizontal]: [0, Math.PI], // Right, Left
  [EdgeType.Vertical]: [Math.PI * 0.5, Math.PI * 1.5], // Up, Down
};

/**
 * Map of corner types to their rotations.
 */
const cornerRotationMap: Record<CornerType, [number, number]> = {
  [CornerType.BottomLeft]: [0, Math.PI * 0.5], // Right, Up
  [CornerType.BottomRight]: [Math.PI, Math.PI * 0.5], // Left, Up
  [CornerType.TopRight]: [Math.PI, Math.PI * 1.5], // Left, Down
  [CornerType.TopLeft]: [0, Math.PI * 1.5], // Right, Down
};

/**
 * Determines if a position is at a corner and returns the corner type.
 *
 * @param position - The position to check.
 * @param halfWidth - Half of the rectangle's width.
 * @param halfDepth - Half of the rectangle's depth.
 * @returns The corner type if the position is at a corner, or null otherwise.
 */
function getCornerType(
  position: Vector3,
  halfWidth: number,
  halfDepth: number
): CornerType | null {
  const topLeft = new Vector3(-halfWidth, 0, -halfDepth);
  const topRight = new Vector3(halfWidth, 0, -halfDepth);
  const bottomRight = new Vector3(halfWidth, 0, halfDepth);
  const bottomLeft = new Vector3(-halfWidth, 0, halfDepth);

  if (position.distanceToSquared(bottomLeft) < EPSILON) {
    return CornerType.BottomLeft;
  } else if (position.distanceToSquared(bottomRight) < EPSILON) {
    return CornerType.BottomRight;
  } else if (position.distanceToSquared(topRight) < EPSILON) {
    return CornerType.TopRight;
  } else if (position.distanceToSquared(topLeft) < EPSILON) {
    return CornerType.TopLeft;
  } else {
    return null;
  }
}

/**
 * Determines the edge type of a position.
 *
 * @param position - The position to check.
 * @param halfWidth - Half of the rectangle's width.
 * @param halfDepth - Half of the rectangle's depth.
 * @returns The edge type if the position is on an edge, or null otherwise.
 */
function getEdgeType(
  position: Vector3,
  halfWidth: number,
  halfDepth: number
): EdgeType | null {
  const onLeft = Math.abs(position.x + halfWidth) < EPSILON;
  const onRight = Math.abs(position.x - halfWidth) < EPSILON;
  const onTop = Math.abs(position.z + halfDepth) < EPSILON;
  const onBottom = Math.abs(position.z - halfDepth) < EPSILON;

  if ((onTop || onBottom) && !(onLeft || onRight)) {
    return EdgeType.Horizontal;
  } else if ((onLeft || onRight) && !(onTop || onBottom)) {
    return EdgeType.Vertical;
  } else {
    return null;
  }
}

/**
 * Creates corner instances from positions.
 *
 * @param positions - The positions of the corners.
 * @param width - The width of the rectangle.
 * @param depth - The depth of the rectangle.
 * @param offset - The offset to apply to positions.
 * @returns An array of CornerInstance objects.
 */
export function createCorners(
  positions: Vector3[],
  width: number,
  depth: number,
  offset: number
): CornerInstance[] {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;
  const corners: CornerInstance[] = [];

  for (let i = 0; i < positions.length; i++) {
    const position = positions[i];
    let rotations: [number, number] | null = null;

    // Determine if the position is at a corner
    const cornerType = getCornerType(position, halfWidth, halfDepth);
    if (cornerType !== null) {
      rotations = cornerRotationMap[cornerType];
    } else {
      // Determine if the position is on an edge
      const edgeType = getEdgeType(position, halfWidth, halfDepth);
      if (edgeType !== null) {
        rotations = edgeRotationMap[edgeType];
      }
    }

    // If the position is either at a corner or on an edge
    if (rotations !== null) {
      const adjustedPosition = adjustPosition(
        position,
        halfWidth,
        halfDepth,
        offset
      );
      const [rot1, rot2] = rotations;

      corners.push({
        position: adjustedPosition,
        rotation: new Euler(0, rot1, 0),
      });
      corners.push({
        position: adjustedPosition,
        rotation: new Euler(0, rot2, 0),
      });
    }
  }

  return corners;
}
