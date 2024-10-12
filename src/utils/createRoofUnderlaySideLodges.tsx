import { Euler, Vector3 } from "three";

export interface LodgeInstance {
  position: Vector3;
  scale: Vector3;
  rotation?: Euler;
}

/**
 * Generates an array of lodge instances evenly spaced within the given depth.
 *
 * @param depth - The total depth available for the lodges.
 * @param lodgeLength - The length of a single lodge (scaling factor on X).
 * @param desiredSpacing - The approximate spacing between lodges (default 0.6 units).
 * @returns An array of LodgeInstance objects representing the lodges.
 */
export function createRoofUnderlaySideLodges(
  width: number,
  depth: number, // Total depth where instances need to fit
  lodgeLength: number = 1 + 0.045, // The lodge length on X for each instance
  desiredSpacing: number = 0.6 // Desired spacing between instances
): LodgeInstance[] {
  const instances: LodgeInstance[] = [];
  const adjustedDepth = depth - 0.6;

  // Calculate the number of instances that can fit within the depth
  const totalInstances = Math.floor(adjustedDepth / desiredSpacing);

  // Calculate the actual spacing to ensure even distribution
  const spacing = adjustedDepth / totalInstances;

  const yPos = 2.2 + 0.2 + 0.025;
  const xPos = width * 0.5 + 0.05 + 0.005;

  // Generate instances with evenly distributed positions along the Z-axis on the X+ side (east)
  for (let i = 0; i < totalInstances; i++) {
    const zPos = -adjustedDepth / 2 + 0.3 + i * spacing;

    instances.push({
      position: new Vector3(xPos, yPos, zPos),
      scale: new Vector3(lodgeLength, 1, 1),
    });
  }

  // X- side (west)
  for (let i = 0; i < totalInstances; i++) {
    const zPos = -adjustedDepth / 2 + 0.3 + i * spacing;

    instances.push({
      position: new Vector3(-xPos, yPos, zPos),
      scale: new Vector3(lodgeLength, 1, 1),
    });
  }

  return instances;
}
