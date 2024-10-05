import { Euler, Vector3 } from "three";


export interface HorizontalBalkInstance {
    position: Vector3;
    scale: Vector3;
    rotation: Euler;
  }

/**
 * Generates data for horizontal balks based on the given dimensions.
 * Various rotations have been applied to diversify the texture pattern along the structure,
 * which means their axes may have rotated as well.
 *
 * @param width - The width of the structure.
 * @param depth - The depth of the structure.
 * @param balkWidth - The width of a single balk.
 * @param verticalBalkHeight - The height of the vertical balks.
 * @returns An array of HorizontalBalkInstance objects.
 */
export function createHorizontalBalks(
  width: number,
  depth: number,
  balkWidth: number,
  verticalBalkHeight: number
): HorizontalBalkInstance[] {
  const balkWidthHalved = balkWidth / 2; // Assuming width == depth

  // Along X axis
  // Top
  return [
    {
      position: new Vector3(
        0,
        verticalBalkHeight + balkWidthHalved,
        -depth * 0.5 + balkWidthHalved
      ),
      scale: new Vector3(width - balkWidth * 2, 1, 1),
      rotation: new Euler(0, 0, 0),
    },

    // Bottom
    {
      position: new Vector3(
        0,
        verticalBalkHeight + balkWidthHalved,
        depth * 0.5 - balkWidthHalved
      ),
      scale: new Vector3(width - balkWidth * 2, 1, 1),
      rotation: new Euler(Math.PI * 2, 0, 0),
    },

    // Along Z axis
    // Right
    {
      position: new Vector3(
        width * 0.5 - balkWidthHalved,
        verticalBalkHeight + balkWidthHalved,
        0
      ),
      scale: new Vector3(depth, 1, 1),
      rotation: new Euler(Math.PI * 1.5, 0, Math.PI * 0.5), // rotations to diversify the texture pattern across the entire structure
    },

    // Left
    {
      position: new Vector3(
        -width * 0.5 + balkWidthHalved,
        verticalBalkHeight + balkWidthHalved,
        0
      ),
      scale: new Vector3(depth, 1, 1),
      rotation: new Euler(Math.PI * 0.5, 0, Math.PI * 0.5),
    },
  ];
}
