import { Euler, Vector3 } from "three";
import { BalkInstance, CornerInstance } from "../types";

/**
 * Function to create balks and corners based on the width, depth, and threshold values.
 * @param width - The user-specified width for the rectangle (X-axis).
 * @param depth - The depth of the rectangle (Z-axis).
 * @param xThreshold - The threshold for inserting midpoints along the X-axis.
 * @param zThreshold - The threshold for inserting midpoints along the Z-axis.
 * @returns A new array of BalkInstances and CornerInstances with positions and rotations.
 */
export const createBalksAndCorners = (
  width: number,
  depth: number,
  xThreshold: number,
  zThreshold: number
): { balks: BalkInstance[]; corners: CornerInstance[] } => {
  // Calculate the number of points along the X-axis
  const numXPoints = Math.ceil(width / xThreshold) + 1; // At least 2 points along X-axis
  const xSpacing = width / (numXPoints - 1); // Calculate equal spacing for X-axis

  // Calculate the number of points along the Z-axis
  const numZPoints = Math.ceil(depth / zThreshold) + 1; // At least 2 points along Z-axis
  const zSpacing = depth / (numZPoints - 1); // Calculate equal spacing for Z-axis

  const newBalks: BalkInstance[] = [];
  const newCorners: CornerInstance[] = [];

  // Loop through the X-axis points
  for (let i = 0; i < numXPoints; i++) {
    const xPos = -width / 2 + i * xSpacing; // Symmetrically distribute points around the X center
    const isXMidpoint = i > 0 && i < numXPoints - 1; // Determine if this is a midpoint

    // For each X point, create corresponding points along the Z-axis
    for (let j = 0; j < numZPoints; j++) {
      const zPos = -depth / 2 + j * zSpacing; // Symmetrically distribute points around the Z center
      const isZMidpoint = j > 0 && j < numZPoints - 1;

      if (isXMidpoint && isZMidpoint) continue;

      // Add balks
      const newBalk = {
        position: new Vector3(xPos, 0, zPos),
        rotation: new Euler(0, 0, 0), // Balks don't rotate in this example
      };
      newBalks.push(newBalk);

      // Correct rotations for the 4 corners at the original positions (vertices)
      let corner1Rotation: Euler;
      let corner2Rotation: Euler;

      if (isXMidpoint) {
        // Midpoints - 180° rotation for both corners
        corner1Rotation = new Euler(0, Math.PI, 0); // Facing opposite
        corner2Rotation = new Euler(0, Math.PI * 2, 0); // Facing opposite
      } else {
        // Handle rotation at the 4 original corners
        if (i === 0 && j === 0) {
          // Corner at (0, 0, 0)
          corner1Rotation = new Euler(0, Math.PI * 2, 0); // Facing down
          corner2Rotation = new Euler(0, Math.PI * 1.5, 0); // Facing right
        } else if (i === numXPoints - 1 && j === 0) {
          // Corner at (width, 0, 0)
          corner1Rotation = new Euler(0, Math.PI * 1.5, 0); // Facing left
          corner2Rotation = new Euler(0, Math.PI, 0); // Facing down
        } else if (i === numXPoints - 1 && j === numZPoints - 1) {
          // Corner at (width, 0, depth)
          corner1Rotation = new Euler(0, Math.PI, 0); // Facing left
          corner2Rotation = new Euler(0, Math.PI * 0.5, 0); // Facing up
        } else if (i === 0 && j === numZPoints - 1) {
          // Corner at (0, 0, depth)
          corner1Rotation = new Euler(0, Math.PI * 0.5, 0); // Facing up
          corner2Rotation = new Euler(0, Math.PI * 2, 0); // Facing right
        } else {
          if (isZMidpoint) {
            corner1Rotation = new Euler(0, Math.PI * 0.5, 0);
            corner2Rotation = new Euler(0, Math.PI * 1.5, 0);
          } else {
            corner1Rotation = new Euler(0, 0, 0);
            corner2Rotation = new Euler(0, 0, 0);
          }
        }
      }

      // Add corner 1
      newCorners.push({
        position: new Vector3(xPos, 0, zPos),
        rotation: corner1Rotation,
      });

      // Add corner 2
      newCorners.push({
        position: new Vector3(xPos, 0, zPos),
        rotation: corner2Rotation,
      });
    }
  }

  return { balks: newBalks, corners: newCorners };
};

//TODO: ideas for a matrix / graph solution
// 1. Init the matrix/grid with balks at positions (based on user input - width, depth, thresholds).
// 2. Pick a seed balk and check neighboring cells in all directions (n, s, w, e).
// 3. Check if the seed is a midpoint.
//     - Midpoint means it lies between two other balks on the same axis.
// 4. If the seed is a midpoint:
//     - Look at the neighboring cells in the n, s, w, e directions.
//     - If there are neighboring balks on opposite sides (e.g., north-south, east-west), set corners to face each other with a 180-degree rotation (PI * 0.5, PI * 1.5 or PI, PI * 2).
// 5. If the seed is not a midpoint (it's a corner):
//     - If there's a neighbor to the north, rotate one corner to face north. If there's a neighbor to the east, rotate a corner to face east, and so on.
