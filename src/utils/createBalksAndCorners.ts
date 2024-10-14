import { BalkInstance, CornerInstance } from "../components/CanopyGroup";
import {
  calculateNumBalks,
  createBalks,
  generateRectangleEdgePositions,
} from "./createBalks";
import { createCorners } from "./createCorners";

/**
 * Main function to create balks and corners for a rectangle structure.
 *
 * @param width - The width of the rectangle.
 * @param depth - The depth of the rectangle.
 * @returns An object containing arrays of balks and corners.
 */
export function createBalksAndCorners(
  width: number,
  depth: number
): { balks: BalkInstance[]; corners: CornerInstance[] } {
  const xThreshold = 4;
  const zThreshold = 4;
  const offset = 0.075; // Vertical balk width halved

  // Ensure the dimensions are at least the minimum allowed
  const minDimension = 0.5;
  width = Math.max(width, minDimension);
  depth = Math.max(depth, minDimension);

  // Calculate the number of balks along X and Z axes
  const numXBalks = calculateNumBalks(width, xThreshold);
  const numZBalks = calculateNumBalks(depth, zThreshold);

  // Generate positions along the rectangle's edges
  const positions = generateRectangleEdgePositions(
    width,
    depth,
    numXBalks,
    numZBalks
  );

  // Create balk instances
  const balks = createBalks(positions, width, depth, offset);

  // Create corner instances
  const corners = createCorners(positions, width, depth, offset);

  return { balks, corners };
}