import { Vector3, Euler } from "three";

export interface RoofUnderlayInstance {
  position: Vector3;
  scale: Vector3;
  rotation: Euler;
}

/**
 * Generates an array of lodge instances based on the structure's dimensions.
 *
 * @param width - The total width of the structure (including overhangs).
 * @param depth - The depth of the structure.
 * @param defaultLodges - The default number of lodges at base width (default is 11).
 * @param lodgeSpacing - Desired spacing between lodges (default is 0.5 units or 500mm).
 * @returns An array of RoofUnderlayInstance objects representing the lodges.
 */
export function createUnderlayLodges(
  width: number,
  depth: number,
  defaultLodges: number = 11,
  lodgeSpacing: number = 0.5 // desired spacing between lodges in units
): RoofUnderlayInstance[] {
  const lodges: RoofUnderlayInstance[] = [];
  const adjustedWidth = width - 0.15; // center the underlay lodges on the horizontal balks

  // base width (default 5.0 minus balk adjustment)
  const baseWidth = 4.85;
  const extraWidth = adjustedWidth - baseWidth; // how much the width has increased or decreased

  // Adjust the number of lodges based on the extra width, ±1 lodge for every ±0.5 units
  const additionalLodges = Math.floor(extraWidth / lodgeSpacing);
  const totalLodges = defaultLodges + additionalLodges;

  // Dynamic spacing between lodges
  const spacing = adjustedWidth / (totalLodges - 1);

  // Cumulative height
  const yPos = 2.2 + 0.15 * 0.5 + 0.15;

  // Generate roof underlay lodges and distribute them evenly along the Z-axis
  for (let i = 0; i < totalLodges; i++) {
    const xPos = -adjustedWidth / 2 + i * spacing; // Center lodges along the Z-axis

    lodges.push({
      position: new Vector3(xPos, yPos, 0),
      scale: new Vector3(depth + 0.16 * 2, 1, 1), // depth + inner overhang
      rotation: new Euler(0, Math.PI * 0.5, 0),
    });
  }

  return lodges;
}
