import { Euler, Vector3 } from "three";
import { BalkInstance } from "../components/CanopyGroup";

export const EPSILON = 1e-6; // Tolerance for floating-point comparisons
const MIN_DIMENSION = 0.5;
const BASE_NUM_BALKS = 2; // One balk at each end

/**
 * Calculates the number of balks along an axis based on dimension and threshold.
 *
 * @param dimension - The length along the axis (width or depth).
 * @param threshold - The length increment after which a new balk is added.
 * @returns The total number of balks along the axis.
 */
export function calculateNumBalks(
  dimension: number,
  threshold: number
): number {
  if (dimension <= MIN_DIMENSION) {
    return BASE_NUM_BALKS;
  } else {
    // Calculate the number of in-between balks
    const inBetweenBalks = Math.floor((dimension - MIN_DIMENSION) / threshold);
    return BASE_NUM_BALKS + inBetweenBalks;
  }
}

/**
 * Generates positions along an edge between two points.
 *
 * @param start - The starting point of the edge.
 * @param end - The ending point of the edge.
 * @param numPoints - The number of points to generate along the edge.
 * @returns An array of Vector3 positions along the edge.
 */
function generateEdgePositions(
  start: Vector3,
  end: Vector3,
  numPoints: number
): Vector3[] {
  const positions: Vector3[] = [];
  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const x = start.x + t * (end.x - start.x);
    const y = start.y + t * (end.y - start.y);
    const z = start.z + t * (end.z - start.z);
    positions.push(new Vector3(x, y, z));
  }
  return positions;
}

/**
 * Generates positions along the edges of a rectangle.
 *
 * @param width - The width of the rectangle.
 * @param depth - The depth of the rectangle.
 * @param numXBalks - The number of balks along the X (width) axis.
 * @param numZBalks - The number of balks along the Z (depth) axis.
 * @returns An array of Vector3 positions along the rectangle edges.
 */
export function generateRectangleEdgePositions(
  width: number,
  depth: number,
  numXBalks: number,
  numZBalks: number
): Vector3[] {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;

  const bottomLeft = new Vector3(-halfWidth, 0, -halfDepth);
  const bottomRight = new Vector3(halfWidth, 0, -halfDepth);
  const topRight = new Vector3(halfWidth, 0, halfDepth);
  const topLeft = new Vector3(-halfWidth, 0, halfDepth);

  const positions: Vector3[] = [];

  // Bottom edge (left to right)
  positions.push(...generateEdgePositions(bottomLeft, bottomRight, numXBalks));

  // Right edge (bottom to top), skip first point (already included)
  positions.push(
    ...generateEdgePositions(bottomRight, topRight, numZBalks).slice(1)
  );

  // Top edge (right to left), skip first point
  positions.push(
    ...generateEdgePositions(topRight, topLeft, numXBalks).slice(1)
  );

  // Left edge (top to bottom), skip first point
  positions.push(
    ...generateEdgePositions(topLeft, bottomLeft, numZBalks).slice(1)
  );

  return positions;
}

/**
 * Adjusts a position based on its location relative to the rectangle edges.
 *
 * @param position - The original position.
 * @param halfWidth - Half of the rectangle's width.
 * @param halfDepth - Half of the rectangle's depth.
 * @param offset - The offset to apply.
 * @returns The adjusted position.
 */
export function adjustPosition(
  position: Vector3,
  halfWidth: number,
  halfDepth: number,
  offset: number
): Vector3 {
  const adjustedPosition = position.clone();

  const onLeft = Math.abs(position.x + halfWidth) < EPSILON;
  const onRight = Math.abs(position.x - halfWidth) < EPSILON;
  const onTop = Math.abs(position.z + halfDepth) < EPSILON;
  const onBottom = Math.abs(position.z - halfDepth) < EPSILON;

  if (onLeft) adjustedPosition.x += offset;
  if (onRight) adjustedPosition.x -= offset;
  if (onTop) adjustedPosition.z += offset;
  if (onBottom) adjustedPosition.z -= offset;

  return adjustedPosition;
}

/**
 * Creates balk instances from positions.
 *
 * @param positions - The positions of the balks.
 * @param width - The width of the rectangle.
 * @param depth - The depth of the rectangle.
 * @param offset - The offset to apply to positions.
 * @returns An array of BalkInstance objects.
 */
export function createBalks(
  positions: Vector3[],
  width: number,
  depth: number,
  offset: number
): BalkInstance[] {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;

  return positions.map((position) => {
    const adjustedPosition = adjustPosition(
      position,
      halfWidth,
      halfDepth,
      offset
    );
    return {
      position: adjustedPosition,
      rotation: new Euler(0, 0, 0),
    };
  });
}
